"use client";
import styles from "./page.module.css";

import EXPERIENCES from "../../libs/experienceData";
import TimelineItem from "../../components/TimelineItem";
import skillsData from "../../libs/skillsData";
const { SKILLS, OTHER_SKILLS, ABILITIES } = skillsData;
import Skill from "../../components/Skill";

const About = () => {
  return (
    <section className={styles.about} aria-labelledby="about-title">
      <h1 id="about-title">Experiência Profissional</h1>
      <article className={styles.timeline} aria-label="Linha do tempo profissional">
        {EXPERIENCES.toReversed().map((experience, index) => (
          <TimelineItem key={index} {...experience}/>
        ))}
      </article>
      <article className={styles.skillsContainer} aria-label="Tecnologias">
        <div>
          <h2>Tecnologias Principais</h2>
          <ul>
            {SKILLS.map((skill, index) => (
              <Skill key={index} {...skill}/>
            ))}
          </ul>
        </div>
        <div>
          <h2>Ferramentas e Processos</h2>
          <ul>
            {OTHER_SKILLS.map((skill, index) => (
              <Skill key={index} {...skill}/>
            ))}
          </ul>
        </div>
        <div>
          <h2>Soft Skills e Suporte</h2>
          <ul>
            {ABILITIES.map((skill, index) => (
              <Skill key={index} {...skill}/>
            ))}
          </ul>
        </div>
      </article>
    </section>
  )
}

export default About;
