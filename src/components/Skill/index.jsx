"use client";
import { useState, useMemo } from "react";
import styles from "./index.module.css";

import { BiTargetLock, BiBarChartAlt2 } from "react-icons/bi";
import { HiOutlineDocumentText } from "react-icons/hi";

const Skill = ({ name, Icon = null, focus, tech, desc }) => {
  const [isOpen, setIsOpen] = useState(false);

  const detailsId = useMemo(
    () => `skill-details-${name.replace(/\s+/g, "-").toLowerCase()}`,
    [name]
  );

  const renderBullets = (level) => {
    return [1, 2, 3].map((i) => (
      <span key={i} className={`${styles.bullet} ${styles[`level${i}`]} ${i <= level ? styles.active : ''}`} aria-hidden={!isOpen}/>
    ));
  };

  return (
    <li className={`${styles.skill} ${isOpen ? styles.open : ''}`}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls={detailsId} aria-label={`${isOpen ? 'Fechar' : 'Abrir'} detalhes da habilidade ${name}`}/>
      <header>
        {Icon && <div><Icon aria-hidden="true" focusable="false"/></div>}
        <h3>{name}</h3>
      </header>
      <div className={styles.details} id={detailsId} aria-hidden={!isOpen}>
        <div className={styles.detailsContent}>
          <div className={styles.detailRow}>
            <h4><BiTargetLock className={styles.detailIcon}/> <span>Nível de foco</span></h4>
            <div role="img" aria-label={`Nível ${focus} de 3`}>
              {renderBullets(focus)}
            </div>
          </div>
          <div className={styles.detailRow}>
            <h4><BiBarChartAlt2 className={styles.detailIcon}/> <span>Nível técnico</span></h4>
            <div role="img" aria-label={`Nível ${tech} de 3`}>
              {renderBullets(tech)}
            </div>
          </div>
          <div className={styles.detailRow}>
            <h4><HiOutlineDocumentText className={styles.detailIcon}/> <span>Experiência</span></h4>
            <p className={styles.description}>{desc}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Skill;
