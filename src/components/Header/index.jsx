"use client";
import { useState, useEffect } from "react";
import styles from "./index.module.css";

import Logo from "../../images/logo.svg";
import Link from "next/link";
import { FaFile } from "react-icons/fa6";
import Modal from "react-modal";

const Header = () => {
  const [theme, setTheme] = useState("dark");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme === "light" ? "lightTheme" : "";
  }, [theme]);

  useEffect(() => {
    if (typeof window !== "undefined") Modal.setAppElement(document.body);
  }, []);

  const Tooltip = `Modo ${theme === "light" ? "escuro" : "claro"}`;

  return (
    <header className={styles.header}>
      <Logo className={styles.logo}/>
      <nav>
        <Link href="/">Início</Link>
        <Link href="/about">Sobre</Link>
        <Link href="/projects">Projetos</Link>
      </nav>
      <div>
        <button type="button" onClick={() => setIsModalOpen(true)} aria-label="Visualizar currículo"><FaFile aria-hidden={true}/>Visualizar CV</button>
        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={{ content: { inset: "5%" } }} className={styles.modal} overlayClassName={styles.modalOverlay}>
          <iframe src="/Curriculum_Vitae.pdf" width="100%" height="100%" style={{ border: "none" }} title="Currículo"/>
        </Modal>
        <label className={styles.themeSwitch}>
          <input type="checkbox" role="switch" onChange={() => setTheme(theme === "light" ? "dark" : "light")} checked={theme === "light"} title={Tooltip} name="isLightMode"/>
          <span title={Tooltip}/>
        </label>
      </div>
    </header>
  );
}

export default Header;
