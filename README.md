# 🌐 Meu Portfólio Pessoal

Este projeto é um portfólio desenvolvido em **React** para apresentar meus projetos, experiências e aprendizados.  
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
  npm start
  ```

---

### Estrutura

```
│
├───📁src
│   │
│   ├───📁components
│   │
│   ├───📁hooks
│   │
│   ├───📁images
│   │
│   └───📁pages
│
└───📁public
```

<details>
<summary>detalhes sobre a estrutura de pastas</summary>
<br>

### Estrutura de pastas

**Components**
A pasta "[components](./src/components/)" contém os componentes reutilizáveis da aplicação, como Header, Footer e Repository (responsável por renderizar os projetos).

**Hooks**
Na pasta "[hooks](./src/hooks)" ficam as chamadas da regra de negócio, sendo elas lógica da aplicação ou chamadas a apis externas.

**Images**
Na pasta "[images](./src/images)" são armazenadas as imagens estáticas utilizadas no projeto.  

**Pages**
A pasta "[pages](./src/pages)" organiza as páginas principais do portfólio:
- Home → página inicial.
- About → breve resumo profissional e lista das principais stacks/skills utilizadas.
- Projects → lista dinâmica dos repositórios. Cada projeto exibe informações relevantes (descrição, data, linguagens, links) e uma thumbnail local associada ao repositório.

**Public**
Podemos usar a pasta "[public](./public/)" para arquivos servidos diretamente pelo servidor, como HTML, documentos, entre outros.

</details>

---

### Tecnologias utilizadas
- React.js
- HTML5
- CSS3
- GitHub API
