import styles from "./page.module.css";

import { getGitHubRepos } from "../../libs/github";
import Repository from "../../components/Repository";

const Projects = async () => {
  try {
    const repos = await getGitHubRepos();

    if (!repos || repos.length === 0) {
      return (
        <section className={styles.projects}>
          <p className={styles.message}>Nenhum repositório encontrado.</p>
        </section>
      );
    }

    return (
      <section className={styles.projects}>
        {repos.map((repo) => (
          <Repository key={repo.name} repoData={repo}/>
        ))}
      </section>
    );
  } catch (err) {
    console.error("Erro ao buscar repositórios:", err);
    return (
      <section className={styles.projects}>
        <p className={styles.errorMessage}>Erro ao carregar dados: {err?.message || "Erro desconhecido"}</p>
      </section>
    );
  }
}

export default Projects;
