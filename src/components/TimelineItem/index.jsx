import styles from "./index.module.css";

import { BiSolidUpArrow } from "react-icons/bi";

const TimelineItem = ({ title, date, company, link, bullets, tags }) => {
  return (
    <div className={styles.timelineItem}>
      <BiSolidUpArrow className={styles.timelineDot} aria-hidden="true" focusable="false"/>
      <div className={styles.timelineContent}>
        <div className={styles.timelineHeader}>
          <h3>{title}</h3>
          <span>{date}</span>
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer" aria-label={`Abrir URL ${company}`}>{company}</a>
        <ul>{bullets.map((bullet, i) => (<li key={i}>{bullet}</li>))}</ul>
        <div className={styles.timelineTags} aria-label={`Tecnologias: ${tags.join(", ")}`}>
          {tags.map((tag) => (<span key={tag}>{tag}</span>))}
        </div>
      </div>
    </div>
  );
}

export default TimelineItem;
