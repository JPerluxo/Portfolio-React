import { React, useState, useEffect } from "react";
import styles from "./index.module.css";

import { ReactComponent as Logo } from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";

const Header = () => {
  const [theme, setTheme] = useState("dark");
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Curriculum_Vitae.pdf";
    link.click();
  };

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
        <button type="button" onClick={handleDownload}><IoMdDownload aria-hidden={true}/>Baixar CV</button>
        <label>
          <input type="checkbox" role="switch" onChange={() => setTheme(theme === "light" ? "dark" : "light")} checked={theme === "light"} title={Tooltip} name="isLightMode"/>
          <span title={Tooltip}/>
        </label>
      </div>
    </header>
  )
}

export default Header;
