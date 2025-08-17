import React from "react";
import styles from "./index.module.css";

import { DiHtml5, DiCss3, DiJavascript, DiReact, DiGit } from "react-icons/di";
import { SiGimp } from "react-icons/si";

const SKILLS = [
  { name: "HTML5", Icon: DiHtml5 },
  { name: "CSS3", Icon: DiCss3 },
  { name: "JavaScript", Icon: DiJavascript },
  { name: "React", Icon: DiReact },
  { name: "Git", Icon: DiGit },
  { name: "Gimp", Icon: SiGimp }
];

const About = () => {
  return (
    <section className={styles.about}>
      <h1>Sobre mim</h1>
      <p>
        Sou desenvolvedor front-end focado em criar interfaces acessíveis, performáticas e fáceis de manter. Estou finalizando o curso de Análise e Desenvolvimento de Sistemas na <a href="https://www.fatecmogidascruzes.com.br/" target="_blank" rel="noopener noreferrer">FATEC</a> e venho me aprofundando em React, JavaScript moderno e boas práticas de CSS.<br/>
        Atuei na <a href="https://www.muralis.com.br/" target="_blank" rel="noopener noreferrer">Muralis</a> como Analista Desenvolvedor de Sistemas, participando do desenvolvimento de aplicações web, integração com APIs e melhoria contínua da interface e usabilidade; antes disso, fui estagiário na <a href="https://portal.prodam.sp.gov.br/" target="_blank" rel="noopener noreferrer">Prodam</a>, atuando com suporte técnico.<br/>
        Nas horas vagas sou um nerd assumido: maratono filmes e animes, jogo e discuto teorias de Star Wars — basicamente uma fonte contínua de inspiração para UX e design de interações.
      </p>
      <div className={styles.skillsContainer}>
        <h2>Habilidades</h2>
        <ul>
          {SKILLS.map(({ name, Icon }) => (
            <li key={name}>
              <Icon aria-hidden="true"/>
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default About;
