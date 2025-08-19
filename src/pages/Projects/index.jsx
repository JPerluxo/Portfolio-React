import React from "react";
import styles from "./index.module.css";

import { useGitHubRepos } from "../../hooks/useGitHubData";
import Repository from "../../components/Repository";

const Projects = () => {
  const { repos, loading, error } = useGitHubRepos();

  return (
    <section className={styles.projects}>
      {loading ? (<p className={styles.message}>Carregando...</p>) :
      error ? <p className={styles.errorMessage}>Erro ao carregar dados: {error}</p> :
        repos.map((repo) => <Repository key={repo.name} repoData={repo}/>)
      }
    </section>
  )
}

export default Projects;
