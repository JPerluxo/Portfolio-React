import { useEffect, useRef, useState } from "react";

const profileUrl = "https://api.github.com/users/JPerluxo";

export function useGitHubProfile() {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setAvatarUrl(null);

    (async () => {
      try {
        const res = await fetch(profileUrl, {
          signal: controller.signal,
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Erro ao buscar perfil");
        if (isMounted.current) setAvatarUrl(json.avatar_url || null);
      } catch (err) {
        if (err.name === "AbortError") return;
        if (isMounted.current) setError(err.message || "Erro desconhecido");
      } finally {
        if (isMounted.current) setLoading(false);
      }
    })();

    return () => {
      isMounted.current = false;
      controller.abort();
    };
  }, []);

  return { avatarUrl, loading, error };
}

export function useGitHubRepos(options = { fetchLanguages: true, concurrency: 5 }) {
  const { fetchLanguages = true, concurrency = 5 } = options;
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);
  const languagesCache = useRef({});

  useEffect(() => {
    isMounted.current = true;

    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setRepos([]);

    (async () => {
      try {
        const res = await fetch(`${profileUrl}/repos`, {
          signal: controller.signal,
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Erro ao buscar repositórios");

        const reduced = json.map((r) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          url: r.html_url,
          created_at: r.created_at,
          homepage: r.homepage,
          languages_url: r.languages_url,
        }));

        if (!fetchLanguages) {
          const noLangs = reduced.map((r) => ({
            name: r.name,
            description: r.description,
            url: r.url,
            created_at: r.created_at,
            homepage: r.homepage,
            languages: [],
          }));
          if (isMounted.current) setRepos(noLangs);
          return;
        }

        const urls = Array.from(
          new Set(reduced.map((r) => r.languages_url).filter(Boolean))
        );

        async function fetchLanguagesForUrls(urlList, chunk = concurrency, signal) {
          const results = {};
          for (let i = 0; i < urlList.length; i += chunk) {
            const chunkUrls = urlList.slice(i, i + chunk);
            const promises = chunkUrls.map(async (url) => {
              if (languagesCache.current[url]) {
                return { url, langs: languagesCache.current[url] };
              }
              try {
                const r = await fetch(url, { signal });
                const j = await r.json();
                if (!r.ok) {
                  return { url, langs: [] };
                }
                const keys = Object.keys(j || {});
                languagesCache.current[url] = keys;
                return { url, langs: keys };
              } catch (err) {
                if (err && err.name === "AbortError") return { url, langs: [] };
              }
            });

            const settled = await Promise.all(promises);
            settled.forEach((s) => {
              results[s.url] = s.langs;
            });
          }
          return results;
        }

        const langsMap = await fetchLanguagesForUrls(urls, concurrency, controller.signal);

        const final = reduced.map((r) => ({
          name: r.name,
          description: r.description,
          url: r.url,
          created_at: r.created_at,
          homepage: r.homepage,
          languages: r.languages_url ? langsMap[r.languages_url] || [] : [],
        }));

        if (isMounted.current) setRepos(final);
      } catch (err) {
        if (err.name === "AbortError") return;
        if (isMounted.current) setError(err.message || "Erro desconhecido");
      } finally {
        if (isMounted.current) setLoading(false);
      }
    })();

    return () => {
      isMounted.current = false;
      controller.abort();
    };
  }, [fetchLanguages, concurrency]);

  return { repos, loading, error };
}

const useGitHubData = { useGitHubProfile, useGitHubRepos };
export default useGitHubData;
