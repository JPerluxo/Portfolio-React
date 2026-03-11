import styles from "./page.module.css";

import EXPERIENCES from "../../libs/experienceData";
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
        {EXPERIENCES.toReversed().map((experience, index) => (
          <TimelineItem
            key={index}
            title={experience.title}
            date={experience.date}
            company={experience.company}
            link={experience.link}
            bullets={experience.bullets}
            tags={experience.tags}
          />
        ))}
      </article>
      <article className={styles.skillsContainer} aria-label="Habilidades">
        <h2>Habilidades</h2>
        <ul>
          {SKILLS.map(({ name, Icon }) => (
            <li key={name}>
              <Icon aria-hidden="true" focusable="false"/>
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}

export default About;
