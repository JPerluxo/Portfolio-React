import { DiHtml5, DiCss3, DiJavascript, DiReact, DiNodejsSmall, DiScrum, DiGit } from "react-icons/di";
import { RiMicrosoftFill } from "react-icons/ri";
import { PiKanbanLight } from "react-icons/pi";
import { TbApi } from "react-icons/tb";

const SKILLS = [
  {
    name: "HTML",
    Icon: DiHtml5,
    focus: 3,
    tech: 2,
    desc: "Sólida base em estruturação semântica e acessível, aplicada no desenvolvimento de widgets e interfaces para sistemas web."
  },
  {
    name: "CSS",
    Icon: DiCss3,
    focus: 3,
    tech: 2,
    desc: "Experiência em estilização com Flexbox, SASS e arquiteturas escaláveis para criar layouts modernos e responsivos."
  },
  {
    name: "JavaScript",
    Icon: DiJavascript,
    focus: 3,
    tech: 2,
    desc: "Domínio da linguagem para criação de lógica complexa e interfaces dinâmicas, com certificação internacional de nível associado (JSA)."
  },
  {
    name: "React.js",
    Icon: DiReact,
    focus: 3,
    tech: 2,
    desc: "Desenvolvimento de aplicações performáticas e componentizadas, focando em melhores práticas e interfaces ricas para o usuário."
  },
  {
    name: "Node.js",
    Icon: DiNodejsSmall,
    focus: 2,
    tech: 2,
    desc: "Conhecimentos em ambiente server-side para suporte ao desenvolvimento front-end e integração de ferramentas de build."
  }
];

const OTHER_SKILLS = [
  {
    name: "Scrum",
    Icon: DiScrum,
    focus: 3,
    tech: 2,
    desc: "Vivência prática em metodologias ágeis, participando de ritos diários para alinhamento e entregas contínuas em fábrica de software."
  },
  {
    name: "Kanban",
    Icon: PiKanbanLight,
    focus: 3,
    tech: 2,
    desc: "Utilização de fluxos visuais para organização de demandas e otimização da produtividade em projetos de consultoria."
  },
  {
    name: "APIs REST",
    Icon: TbApi,
    focus: 2,
    tech: 2,
    desc: "Experiência na integração de serviços externos e consumo de dados para alimentar aplicações e dashboards."
  },
  {
    name: "Git",
    Icon: DiGit,
    focus: 3,
    tech: 2,
    desc: "Uso constante para controle de versão e colaboração em equipe, garantindo a integridade e organização do código-fonte."
  },
  {
    name: "Microsoft Office",
    Icon: RiMicrosoftFill,
    focus: 1,
    tech: 2,
    desc: "Proficiência no pacote Office para elaboração de documentação técnica e suporte a atividades administrativas."
  }
];

const ABILITIES = [
  {
    name: "Revisão de código",
    focus: 3,
    tech: 2,
    desc: "Foco em garantir a qualidade e padronização do software através da análise técnica colaborativa entre o time."
  },
  {
    name: "Suporte Técnico",
    focus: 1,
    tech: 2,
    desc: "Experiência em diagnóstico e resolução de problemas de hardware e software, além de manutenção de sistemas operacionais."
  },
  {
    name: "Suporte ao usuário remoto",
    focus: 1,
    tech: 2,
    desc: "Atendimento direto ao cliente para solução de incidentes técnicos com foco em agilidade e clareza."
  },
  {
    name: "Comunicação",
    focus: 3,
    tech: 2,
    desc: "Habilidade em articular ideias técnicas para diferentes públicos, adquirida no contato direto com clientes e equipes multidisciplinares."
  }
];

export default { SKILLS, OTHER_SKILLS, ABILITIES };
