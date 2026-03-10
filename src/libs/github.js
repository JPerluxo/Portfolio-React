import BLACKLIST from "./blacklist";
import fs from "fs";
import path from "path";

const BASE_URL = "https://api.github.com/users/JPerluxo";
const REVALIDATE_TIME = 60 * 60 * 24;
const thumbsDir = path.join(process.cwd(), "public", "thumbs");

export async function getGitHubProfile() {
  const res = await fetch(BASE_URL, {
    next: { revalidate: REVALIDATE_TIME },
  });

  const text = await res.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {}
  if (!res.ok) throw new Error(data?.message || `${res.status} — ${res.statusText}`);
  if (!data) throw new Error("A API não retornou um JSON válido.");

  return { avatarUrl: data.avatar_url };
}

export async function getGitHubRepos() {
  const res = await fetch(`${BASE_URL}/repos?per_page=100`, {
    next: { revalidate: REVALIDATE_TIME },
  });

  const text = await res.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {}
  if (!res.ok) throw new Error(data?.message || `${res.status} — ${res.statusText}`);
  if (!data) throw new Error("A API não retornou um JSON válido.");

  const blacklist = new Set(BLACKLIST.map((n) => String(n).trim().toLowerCase()));
  const filtered = data.filter((r) => !blacklist.has(String(r.name).trim().toLowerCase())).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const reposWithLanguages = [];
  const CONCURRENCY = 5;

  for (let i = 0; i < filtered.length; i += CONCURRENCY) {
    const chunk = filtered.slice(i, i + CONCURRENCY);
    const chunkResults = await Promise.all(
      chunk.map(async (repo) => {
        try {
          const langRes = await fetch(repo.languages_url, {
            next: { revalidate: REVALIDATE_TIME }
          });

          if (!langRes.ok) return { ...repo, languages: [] };
          const langsJson = await langRes.json();

          return {
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            created_at: repo.created_at,
            homepage: repo.homepage,
            languages: Object.keys(langsJson || {}),
          };
        } catch {
          return {
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            created_at: repo.created_at,
            homepage: repo.homepage,
            languages: [],
          };
        }
      })
    );

    reposWithLanguages.push(...chunkResults);
  }

  return reposWithLanguages.map((repo) => {
    const filePath = path.join(thumbsDir, `${repo.name}.png`);
    const thumbnail = fs.existsSync(filePath) ? `/thumbs/${repo.name}.png` : "/thumbs/No-Image.png";
    return { ...repo, thumbnail };
  });
}
