# 🌐 Meu Portfólio Pessoal

Este projeto é um portfólio desenvolvido em **React** e **Next.js** para apresentar meus projetos, experiências e aprendizados.  
Ele consome dados diretamente da **[API do GitHub](https://docs.github.com/pt/rest)**, exibindo informações dos meus repositórios.

🔗 Acesse aqui: https://jperluxo.vercel.app/

### Execução

- Dependências:
  Execute o comando na raiz do projeto:
  ```bash
  npm install
  ```

- Dev:
  Execute o comando na raiz do projeto:
  ```bash
  npm run dev
  ```

---

### Estrutura

```
│
├───📁src
│   │
│   ├───📁app
│   │
│   ├───📁components
│   │
│   ├───📁images
│   │
│   └───📁libs
│
└───📁public
```

<details>
<summary>detalhes sobre a estrutura de pastas</summary>
<br>

### Estrutura de pastas

**App**\
A pasta [`app/`](./src/app/) organiza as páginas principais do portfólio:
- [Home](./src/app/page.jsx) → página inicial.
- [About](./src/app/about/page.jsx) → breve resumo profissional e lista das principais stacks/skills utilizadas.
- [Projects](./src/app/projects/page.jsx) → lista dinâmica dos repositórios. Cada projeto exibe informações relevantes (descrição, data, linguagens, links) e uma thumbnail local associada ao repositório.

**Components**\
A pasta [`components/`](./src/components/) reúne os componentes reutilizáveis responsáveis pela estrutura e organização visual da aplicação.

**Images**\
Na pasta [`images/`](./src/images) são armazenadas as imagens utilizadas no layout que são importadas diretamente nos componentes.

**Libs**\
A pasta [`libs/`](./src/libs/) centraliza a integração com APIs externas e outras lógicas necessárias para o funcionamento do projeto.

**Public**\
A pasta [`public/`](./public/) contém arquivos estáticos servidos diretamente pelo navegador, como thumbnails dos projetos e documentos.

</details>

---

### Tecnologias utilizadas
- Next.js
- React.js
- CSS Modules
- GitHub API
- Vercel (deploy)
