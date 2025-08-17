import React from "react";
import styles from "./index.module.css";

import { ReactComponent as Logo } from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";

const Header = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Curriculum_Vitae.pdf";
    link.download = "Jefferson-Perluxo-Clemente-CV.pdf";
    link.click();
  };

  return (
    <header className={styles.header}>
      <Logo className={styles.logo}/>
      <nav>
        <Link to="/">Início</Link>
        <Link to="/about">Sobre</Link>
        <Link to="/projects">Projetos</Link>
      </nav>
      <button type="button" onClick={handleDownload}><IoMdDownload aria-hidden={true}/>Baixar CV</button>
    </header>
  )
}

export default Header;
