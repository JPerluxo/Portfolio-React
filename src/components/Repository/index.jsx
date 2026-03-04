"use client";
import styles from "./index.module.css";

const Repository = ({ repoData }) => {
  const formattedDate = new Date(repoData.created_at).toLocaleDateString("pt-BR");

  return (
    <article className={styles.repository}>
      <img src={repoData.thumbnail} alt={`Thumbnail do projeto ${repoData.name}`} loading="lazy"/>
      <div className={styles.meta}>
        <h3>{repoData.name}</h3>
        <p>{repoData.description}</p>
        <span className={styles.date}>{`Criado em: ${formattedDate}`}</span>
        {Array.isArray(repoData.languages) && repoData.languages.length > 0 && (
          <ul className={styles.languages} aria-label={`Linguagens utilizadas em ${repoData.name}`}>
            {repoData.languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.links}>
        <a href={repoData.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir repositório ${repoData.name} no GitHub`}>Repositório no GitHub</a>
        {repoData.homepage && (
          <a href={repoData.homepage} target="_blank" rel="noopener noreferrer" aria-label={`Abrir URL ${repoData.name}`}>URL da solução</a>
        )}
      </div>
    </article>
  );
}

export default Repository;
