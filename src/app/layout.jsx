import "./layout.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Meu Portfólio",
  description: "Portfólio digital criado em React e Next.js, exibindo meus trabalhos e experiências"
};

const RootLayout = ({ children }) => {
  return (
    <html lang="pt-BR">
      <body>
        <div className="app">
          <div className="background"/>
          <Header/>
          <main className="main">
            {children}
          </main>
          <Footer/>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
