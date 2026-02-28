export const metadata = {
  title: "Meu Portfólio",
  description: "Portfólio digital criado em React e Next.js, exibindo meus trabalhos e experiências"
};

const RootLayout = ({ children }) => {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
