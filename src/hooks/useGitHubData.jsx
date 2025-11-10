import { useEffect, useRef, useState } from "react";
import BLACKLIST from "../blacklist";

const profileUrl = "https://api.github.com/users/JPerluxo";

const CACHE_KEY = "gh_hook_cache_v1";
const DEFAULT_TTL = 1000 * 60 * 60 * 24;

const memoryCache = new Map();

function loadLocalCache() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    const now = Date.now();
    Object.keys(parsed).forEach((url) => {
      const it = parsed[url];
      if (it.expiry && it.expiry > now) {
        memoryCache.set(url, it);
      }
    });
  } catch (e) {}
}

function persistLocalCache() {
  if (typeof window === "undefined") return;
  try {
    const toSave = {};
    const now = Date.now();
    memoryCache.forEach((val, key) => {
      if (val.expiry && val.expiry > now) {
        toSave[key] = val;
      }
    });
    localStorage.setItem(CACHE_KEY, JSON.stringify(toSave));
  } catch (e) {}
}

function getCached(url) {
  const it = memoryCache.get(url);
  if (!it) return null;
  if (it.expiry && it.expiry < Date.now()) {
    memoryCache.delete(url);
    persistLocalCache();
    return null;
  }
  return it;
}

function setCached(url, data, etag, ttl = DEFAULT_TTL) {
  const expiry = Date.now() + ttl;
  const payload = { data, etag: etag || null, expiry };
  memoryCache.set(url, payload);
  try {
    persistLocalCache();
  } catch (e) {}
}

loadLocalCache();

async function fetchWithCache(url, { signal, ttl = DEFAULT_TTL } = {}) {
  const cached = getCached(url);
  if (cached && cached.data) {
    return cached.data;
  }

  const headers = {};
  if (cached && cached.etag) {
    headers["If-None-Match"] = cached.etag;
  }

  const res = await fetch(url, { signal, headers });
  if (res.status === 304 && cached) {
    setCached(url, cached.data, cached.etag, ttl);
    return cached.data;
  }

  const json = await res.json();

  if (!res.ok) {
    const msg = json && json.message ? json.message : `Erro ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }

  const etag = res.headers.get("etag");
  setCached(url, json, etag, ttl);
  return json;
}

export function useGitHubProfile(options = { ttl: DEFAULT_TTL }) {
  const { ttl = DEFAULT_TTL } = options;
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const json = await fetchWithCache(profileUrl, {
          signal: controller.signal,
          ttl,
        });
        if (isMounted.current) setAvatarUrl(json.avatar_url || null);
      } catch (err) {
        if (err && err.name === "AbortError") return;
        if (isMounted.current) setError(err.message || "Erro desconhecido");
      } finally {
        if (isMounted.current) setLoading(false);
      }
    })();

    return () => {
      isMounted.current = false;
      controller.abort();
    };
  }, [ttl]);

  return { avatarUrl, loading, error };
}

export function useGitHubRepos(options = { fetchLanguages: true, concurrency: 5, ttl: DEFAULT_TTL }) {
  const { fetchLanguages = true, concurrency = 5, ttl = DEFAULT_TTL } = options;
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setRepos([]);

    (async () => {
      try {
        const json = await fetchWithCache(`${profileUrl}/repos`, {
          signal: controller.signal,
          ttl,
        });

        const reduced = json
          .map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            url: r.html_url,
            created_at: r.created_at,
            homepage: r.homepage,
            languages_url: r.languages_url,
          }))
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

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
              try {
                const j = await fetchWithCache(url, { signal, ttl });
                const keys = Object.keys(j || {});
                return { url, langs: keys };
              } catch (err) {
                if (err && err.name === "AbortError") return { url, langs: [] };
                return { url, langs: [] };
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

        const blacklist = new Set(BLACKLIST.map((n) => String(n).trim().toLowerCase()));
        if (isMounted.current) setRepos(final.filter((r) => !blacklist.has(String(r.name).trim().toLowerCase())));
      } catch (err) {
        if (err && err.name === "AbortError") return;
        if (isMounted.current) setError(err.message || "Erro desconhecido");
      } finally {
        if (isMounted.current) setLoading(false);
      }
    })();

    return () => {
      isMounted.current = false;
      controller.abort();
    };
  }, [fetchLanguages, concurrency, ttl]);

  return { repos, loading, error };
}

const useGitHubData = { useGitHubProfile, useGitHubRepos };
export default useGitHubData;
