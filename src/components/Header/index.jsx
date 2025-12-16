import { React, useState, useEffect } from "react";
import styles from "./index.module.css";

import { ReactComponent as Logo } from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { FaFile } from "react-icons/fa6";
import Modal from "react-modal";

const Header = () => {
  const [theme, setTheme] = useState("dark");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme === "light" ? "lightTheme" : "";
  }, [theme]);

  const Tooltip = `Modo ${theme === "light" ? "escuro" : "claro"}`;

  return (
    <header className={styles.header}>
      <Logo className={styles.logo}/>
      <nav>
        <Link to="/">Início</Link>
        <Link to="/about">Sobre</Link>
        <Link to="/projects">Projetos</Link>
      </nav>
      <div>
        <button type="button" onClick={() => setIsModalOpen(true)}><FaFile aria-hidden={true}/>Visualizar CV</button>
        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={{content: {inset: "5%"}}} className={styles.modal} overlayClassName={styles.modalOverlay}>
          <iframe src="/Curriculum_Vitae.pdf" width="100%" height="100%" style={{ border: "none" }} title="Currículo"/>
        </Modal>
        <label>
          <input type="checkbox" role="switch" onChange={() => setTheme(theme === "light" ? "dark" : "light")} checked={theme === "light"} title={Tooltip} name="isLightMode"/>
          <span title={Tooltip}/>
        </label>
      </div>
    </header>
  )
}

export default Header;
