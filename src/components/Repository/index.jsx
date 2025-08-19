import React from "react";
import styles from "./index.module.css";

import NoImage from "../../images/thumbs/No-Image.png";

const importAll = (r) => {
  let images = {};
  r.keys().forEach((key) => {
    const name = key.replace("./", "").split(".")[0];
    images[name] = r(key).default || r(key);
  });
  return images;
};

const thumbs = importAll(require.context("../../images/thumbs", false, /\.(png|jpe?g|svg)$/));

const Repository = ({ repoData }) => {
  const formattedDate = new Date(repoData.created_at).toLocaleDateString("pt-BR");

  return (
    <article key={repoData.name} className={styles.repository}>
      <img src={thumbs[repoData.name] || NoImage} alt={`Thumbnail do projeto ${repoData.name}`} loading="lazy"/>
      <div>
        <h3>{repoData.name}</h3>
        <p>{repoData.description}</p>
        <span>{`Criado em: ${formattedDate}`}</span>
        <ul>
          {repoData.languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>  
      <div className={styles.links}>
        <a href={repoData.url} target="_blank" rel="noopener noreferrer">Repositório no GitHub</a>
        {repoData.homepage && (<a href={repoData.homepage} target="_blank" rel="noopener noreferrer">URL da solução</a>)}
      </div>
    </article>
  )
}

export default Repository;
