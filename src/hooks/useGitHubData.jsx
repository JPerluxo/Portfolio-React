import { useState, useEffect } from "react";

function useGitHubData() {
  const [data, setData] = useState({ profile: null, repos: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      try {
        const profileRes = await fetch("https://api.github.com/users/JPerluxo");
        const profileData = await profileRes.json();
        if (!profileRes.ok) throw new Error(profileData.message || "Erro ao buscar perfil");

        const reposRes = await fetch(profileData.repos_url);
        const reposData = await reposRes.json();
        if (!reposRes.ok) throw new Error(reposData.message || "Erro ao buscar repositórios");

        setData({ profile: profileData, repos: reposData });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

export default useGitHubData;
