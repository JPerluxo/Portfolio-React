import React from "react";
import styles from "./index.module.css";

import useGitHubData from "../../hooks/useGitHubData";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Home = () => {
  const { data, loading, error } = useGitHubData();

  return (
    <section className={styles.home}>
      {loading ? (<p className={styles.message}>Carregando...</p>) : error ? <p className={styles.errorMessage}>Erro ao carregar dados: {error}</p> : <>
        <div className={styles.textContainer}>
          <h1>Jefferson Perluxo Clemente</h1>
          <p>
            Sou um desenvolvedor admirador da tecnologia e sempre disposto a explorar novas ferramentas deste vasto mundo da programação.<br/>
            No momento, estou estudando <strong>Análise e Desenvolvimento de Sistemas</strong>, com ênfase no desenvolvimento front-end.
          </p>
          <div className={styles.contactsContainer}>
            <h2>Contato:</h2>
            <a href="mailto:jperluxo@gmail.com?subject=Contato%20pelo%20Portf%C3%B3lio" target="_blank" rel="noopener noreferrer">
              <span><BiLogoGmail aria-hidden={true}/>E-mail</span>
            </a>
            <a href="https://www.linkedin.com/in/jperluxo/" target="_blank" rel="noopener noreferrer">
              <span><FaLinkedin aria-hidden={true}/>LinkedIn</span>
            </a>
            <a href={data.profile?.html_url} target="_blank" rel="noopener noreferrer">
              <span><FaGithub aria-hidden={true}/>GitHub</span>
            </a>
          </div>
        </div>
        <div className={styles.photoContainer}>
          <img src={data.profile?.avatar_url} alt="Foto do GitHub" loading="lazy"/>
        </div>
      </>}
    </section>
  )
}

export default Home;
