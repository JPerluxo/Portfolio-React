import styles from "./page.module.css";

import Image from "next/image";
import { getGitHubProfile } from "../libs/github";
import ProfilePic from "@/images/profile_pic.jpg";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Home = async () => {
  let avatarUrl;

  try {
    const profile = await getGitHubProfile();
    avatarUrl = profile.avatarUrl;
  } catch {
    avatarUrl = null;
  }

  return (
    <section className={styles.home}>
      <div className={styles.textContainer}>
        <h1>Jefferson Perluxo Clemente</h1>
        <p>
          Sou um desenvolvedor admirador da tecnologia e sempre disposto a explorar novas ferramentas deste vasto mundo da programação.<br/>
          No momento, estou estudando <strong>Análise e Desenvolvimento de Sistemas</strong>, com ênfase no desenvolvimento front-end.
        </p>
        <div className={styles.contactsContainer}>
          <h2>Contato:</h2>
          <a href="mailto:jperluxo@gmail.com?subject=Contato%20pelo%20Portf%C3%B3lio" rel="noopener noreferrer">
            <span><BiLogoGmail aria-hidden="true" focusable="false"/>E-mail</span>
          </a>
          <a href="https://www.linkedin.com/in/jperluxo/" target="_blank" rel="noopener noreferrer">
            <span><FaLinkedin aria-hidden="true" focusable="false"/>LinkedIn</span>
          </a>
          <a href="https://github.com/JPerluxo" target="_blank" rel="noopener noreferrer">
            <span><FaGithub aria-hidden="true" focusable="false"/>GitHub</span>
          </a>
        </div>
      </div>
      <div className={styles.photoContainer}>
        <Image src={avatarUrl || ProfilePic} alt="Foto do GitHub" width="300" height="300" priority/>
      </div>
    </section>
  );
}

export default Home;
