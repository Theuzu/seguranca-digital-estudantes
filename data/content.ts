export type ContentIntro = {
  id: "content-intro";
  paragraphs: readonly [string, string];
};

export type TopicId =
  | "senhas-autenticacao"
  | "cyberbullying-etica"
  | "computadores-compartilhados"
  | "trabalhos-na-nuvem"
  | "golpes-links-falsos";

export type TopicIconKey =
  | "key"
  | "comments"
  | "computer"
  | "cloud"
  | "link";

export type TopicChoice = {
  id: TopicId;
  icon: TopicIconKey;
  title: string;
  description: string;
};

export type TopicChooserContent = {
  id: "topic-chooser";
  heading: "Escolha um tema";
  topics: readonly [
    TopicChoice,
    TopicChoice,
    TopicChoice,
    TopicChoice,
    TopicChoice,
  ];
};

export const contentIntro: ContentIntro = {
  id: "content-intro",
  paragraphs: [
    "Durante a faculdade, utilizamos senhas, plataformas acadêmicas, computadores compartilhados, serviços de armazenamento em nuvem e grupos de comunicação. Pequenos descuidos nesses ambientes podem causar perda de arquivos, exposição de informações e conflitos entre estudantes.",
    "Este guia apresenta orientações práticas que podem ser aplicadas no dia a dia.",
  ],
};

export const topicChooser: TopicChooserContent = {
  id: "topic-chooser",
  heading: "Escolha um tema",
  topics: [
    {
      id: "senhas-autenticacao",
      icon: "key",
      title: "Senhas e verificação em duas etapas",
      description:
        "Use senhas fortes e ative uma camada extra de proteção.",
    },
    {
      id: "cyberbullying-etica",
      icon: "comments",
      title: "Cyberbullying e ética digital",
      description:
        "Comunique-se com respeito e saiba agir diante de abusos.",
    },
    {
      id: "computadores-compartilhados",
      icon: "computer",
      title: "Computadores compartilhados",
      description:
        "Proteja suas contas e arquivos em laboratórios e bibliotecas.",
    },
    {
      id: "trabalhos-na-nuvem",
      icon: "cloud",
      title: "Trabalhos na nuvem",
      description:
        "Compartilhe com cuidado e mantenha cópias seguras.",
    },
    {
      id: "golpes-links-falsos",
      icon: "link",
      title: "Golpes e links falsos",
      description:
        "Reconheça mensagens e oportunidades suspeitas antes de clicar.",
    },
  ],
};
