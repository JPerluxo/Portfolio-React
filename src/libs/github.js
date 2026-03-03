import BLACKLIST from "./blacklist";

const BASE_URL = "https://api.github.com/users/JPerluxo";
const REVALIDATE_TIME = 60 * 60 * 24;

export async function getGitHubProfile() {
  const res = await fetch(BASE_URL, {
    next: { revalidate: REVALIDATE_TIME },
  });

  if (!res.ok) throw new Error("Erro ao buscar perfil do GitHub");

  const json = await res.json();
  return { avatarUrl: json.avatar_url };
}

export async function getGitHubRepos() {
  const res = await fetch(`${BASE_URL}/repos`, {
    next: { revalidate: REVALIDATE_TIME },
  });

  if (!res.ok) throw new Error("Erro ao buscar repositórios");

  const repos = await res.json();
  const blacklist = new Set(BLACKLIST.map((n) => String(n).trim().toLowerCase()));
  const filtered = repos.filter((r) => !blacklist.has(String(r.name).trim().toLowerCase())).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
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

  return reposWithLanguages;
}
