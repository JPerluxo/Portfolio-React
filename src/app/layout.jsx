import "./layout.css";

import Header from "../components/Header";

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
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
