"use client";
import { useState, useEffect } from "react";
import styles from "./index.module.css";

import Logo from "../../images/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFile } from "react-icons/fa6";
import Modal from "react-modal";

const Header = () => {
  const [theme, setTheme] = useState("dark");
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme === "light" ? "lightTheme" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window !== "undefined") Modal.setAppElement("#app-root");
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) window.scrollTo({ top: 0, behavior: "smooth" });
    if (isMobileMenuOpen || isModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => document.body.style.overflow = "";
  }, [isMobileMenuOpen, isModalOpen]);

  const Tooltip = `Modo ${theme === "light" ? "escuro" : "claro"}`;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const isActive = (href) => pathname === href;

  return (
    <header className={styles.header}>
      <Logo className={styles.logo}/>
      {isMobileMenuOpen && (<div className={styles.overlay} onClick={closeMobileMenu}/>)}
      <button className={`${styles.mobileMenuToggle} ${isMobileMenuOpen ? styles.activeToggle : ""}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Alternar menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`${styles.menuContainer} ${isMobileMenuOpen ? styles.activeMenu : ""}`}>
        <nav>
          <Link href="/" className={isActive("/") ? styles.activeLink : ""} aria-current={isActive("/") ? "page" : undefined} onClick={closeMobileMenu}>Início</Link>
          <Link href="/about" className={isActive("/about") ? styles.activeLink : ""} aria-current={isActive("/about") ? "page" : undefined} onClick={closeMobileMenu}>Sobre</Link>
          <Link href="/projects" className={isActive("/projects") ? styles.activeLink : ""} aria-current={isActive("/projects") ? "page" : undefined} onClick={closeMobileMenu}>Projetos</Link>
        </nav>
        <div>
          <button type="button" onClick={() => { setIsModalOpen(true); closeMobileMenu(); }} aria-label="Visualizar currículo"><FaFile aria-hidden={true}/>Visualizar CV</button>
          <label className={styles.themeSwitch}>
            <input type="checkbox" role="switch" onChange={() => setTheme(theme === "light" ? "dark" : "light")} checked={theme === "light"} title={Tooltip} name="isLightMode"/>
            <span title={Tooltip}/>
          </label>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={{ content: { inset: "5%" } }} className={styles.modal} overlayClassName={styles.modalOverlay}>
        <iframe src="/Curriculum_Vitae.pdf" width="100%" height="100%" style={{ border: "none" }} title="Currículo"/>
      </Modal>
    </header>
  );
}

export default Header;
