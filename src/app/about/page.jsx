import styles from "./page.module.css";

import TimelineItem from "../../components/TimelineItem";
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
    <section className={styles.about} aria-labelledby="about-title">
      <h1 id="about-title">Experiência Profissional</h1>
      <article className={styles.timeline} aria-label="Linha do tempo profissional">
        <TimelineItem
          title={"Analista Desenvolvedor de Sistemas Jr"}
          date={"Set 2022 - Nov 2024"}
          company={"Muralis Tecnologia"}
          link={"https://www.muralis.com.br/"}
          bullets={[
            "Desenvolvimento de interfaces web com foco em React, aplicando boas práticas de componentização, organização de estado e reutilização de código.",
            "Implementação e manutenção de aplicações com JavaScript moderno (ES6+) e integração com APIs REST.",
            "Atuação em projetos com backend em Node.js para consumo e manipulação de dados.",
            "Implementação de funcionalidades customizadas em aplicações geoespaciais.",
            "Participação em reuniões técnicas, alinhamento com clientes e atuação em modelo de consultoria."
          ]}
          tags={["HTML5","CSS3","Javascript","React","Node.js","APIs REST","Scrum","Kanban","Revisão de código","Git"]}
        />
        <TimelineItem
          title={"Estagiário no departamento de Tecnologia - Suporte técnico ao usuário"}
          date={"Jun 2021 - Jul 2022"}
          company={"Prodam"}
          link={"https://portal.prodam.sp.gov.br/"}
          bullets={[
            "Suporte técnico a usuários (análise e resolução de problemas em desktops e notebooks).",
            "Instalação, formatação e manutenção de sistemas operacionais.",
            "Criação e replicação de imagens em servidores e estações de trabalho.",
            "Remoção de vírus e instalação de softwares, drivers e antivírus."
          ]}
          tags={["Suporte técnico","Suporte ao usuário remoto","Comunicação","Microsoft Office"]}
        />
      </article>
      <div className={styles.skillsContainer} aria-label="Habilidades">
        <h2>Habilidades</h2>
        <ul>
          {SKILLS.map(({ name, Icon }) => (
            <li key={name}>
              <Icon aria-hidden="true" focusable="false"/>
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default About;
