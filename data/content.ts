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

export type TopicChooserTitle = {
  lineOne: string;
  lineTwo: string;
  accent: string;
};

export type TopicChooserContent = {
  id: "topic-chooser";
  title: TopicChooserTitle;
  topics: readonly [
    TopicChoice,
    TopicChoice,
    TopicChoice,
    TopicChoice,
    TopicChoice,
  ];
};

export type TopicProblemContent = {
  heading: string;
  paragraphs: readonly [string, ...string[]];
};

export type TopicGuidanceEntry = {
  id: string;
  label: string;
  title: string;
  body: string;
};

export type TopicChecklistItem = {
  id: string;
  text: string;
};

export type TopicDetailContent = {
  id: TopicId;
  eyebrow: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  problem: TopicProblemContent;
  guidanceHeading: string;
  guidance: readonly [TopicGuidanceEntry, ...TopicGuidanceEntry[]];
  checklistHeading: string;
  checklist: readonly [TopicChecklistItem, ...TopicChecklistItem[]];
};

export const contentIntro: ContentIntro = {
  id: "content-intro",
  paragraphs: [
    "Durante os estudos, utilizamos senhas, plataformas acadêmicas, computadores compartilhados, serviços de armazenamento em nuvem e grupos de comunicação. Pequenos descuidos nesses ambientes podem causar perda de arquivos, exposição de informações e conflitos entre estudantes.",
    "Este guia apresenta orientações práticas que podem ser aplicadas no dia a dia.",
  ],
};

export const topicChooser: TopicChooserContent = {
  id: "topic-chooser",
  title: {
    lineOne: "Explore um",
    lineTwo: "tema",
    accent: "->",
  },
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

export const topicDetails: readonly TopicDetailContent[] = [
  {
    id: "senhas-autenticacao",
    eyebrow: "TEMA 1",
    title: "SENHAS E AUTENTICAÇÃO EM DUAS ETAPAS",
    image: {
      src: "/password.jpg",
      alt: "Password",
    },
    problem: {
      heading: "O problema",
      paragraphs: [
        "Muitos estudantes utilizam a mesma senha no e-mail, nas redes sociais e nas plataformas acadêmicas. Quando uma dessas contas é comprometida, outras contas que utilizam a mesma senha também podem ficar em risco.",
        "Senhas curtas, previsíveis ou relacionadas a informações pessoais são mais fáceis de descobrir. Também existe o risco de códigos de acesso serem compartilhados por engano com pessoas mal-intencionadas.",
      ],
    },
    guidanceHeading: "Como se proteger",
    guidance: [
      {
        id: "usar-senhas-diferentes",
        label: "01",
        title: "Use senhas diferentes",
        body: "Use uma senha diferente para cada conta importante. Dê preferência a senhas longas, que combinem palavras, números e símbolos sem utilizar informações fáceis de descobrir.",
      },
      {
        id: "ativar-autenticacao-duas-etapas",
        label: "02",
        title: "Ative a autenticação em duas etapas",
        body: "Ative a autenticação em duas etapas sempre que ela estiver disponível. Com esse recurso, uma pessoa que descobrir sua senha ainda precisará de uma segunda confirmação para acessar a conta.",
      },
      {
        id: "nao-compartilhar-codigos",
        label: "03",
        title: "Não compartilhe códigos",
        body: "Nunca compartilhe códigos recebidos por SMS, e-mail ou aplicativo autenticador. Instituições, professores e equipes de suporte não precisam solicitar esse código.",
      },
    ],
    checklistHeading: "Checklist rápido",
    checklist: [
      {
        id: "senhas-diferentes",
        text: "Uso senhas diferentes nas contas mais importantes.",
      },
      {
        id: "sem-dados-previsiveis",
        text: "Evito nomes, datas de nascimento e sequências previsíveis.",
      },
      {
        id: "autenticacao-ativada",
        text: "Ativei a autenticação em duas etapas.",
      },
      {
        id: "codigos-protegidos",
        text: "Não compartilho códigos de verificação.",
      },
      {
        id: "troca-em-atividade-suspeita",
        text: "Troco a senha quando percebo alguma atividade suspeita.",
      },
    ],
  },
  {
    id: "cyberbullying-etica",
    eyebrow: "TEMA 2",
    title: "CYBERBULLYING E ÉTICA NOS GRUPOS DE TURMA",
    image: {
      src: "/cyberbullying.jpg",
      alt: "Cyberbullying",
    },
    problem: {
      heading: "O problema",
      paragraphs: [
        "Grupos de turma e redes sociais facilitam a comunicação entre estudantes, mas também podem ser usados para espalhar ofensas, boatos, imagens, áudios ou capturas de tela sem autorização.",
        "Mesmo quando uma mensagem é enviada como brincadeira, ela pode constranger, excluir ou prejudicar outra pessoa. No ambiente digital, conteúdos também podem ser copiados e compartilhados rapidamente.",
      ],
    },
    guidanceHeading: "Como agir",
    guidance: [
      {
        id: "pensar-antes-de-compartilhar",
        label: "01",
        title: "Pense antes de compartilhar",
        body: "Antes de publicar ou encaminhar alguma mensagem, pense se o conteúdo pode expor ou constranger outra pessoa.",
      },
      {
        id: "respeitar-privacidade",
        label: "02",
        title: "Respeite a privacidade",
        body: "Não compartilhe fotos, vídeos, áudios ou conversas privadas sem autorização. Em trabalhos e grupos acadêmicos, procure discordar de ideias sem atacar quem as apresentou.",
      },
      {
        id: "nao-incentivar-e-procurar-apoio",
        label: "03",
        title: "Não incentive e procure apoio",
        body: "Ao presenciar cyberbullying, evite incentivar ou compartilhar o conteúdo. A pessoa afetada pode guardar registros da situação, bloquear ou denunciar os responsáveis e procurar apoio da coordenação, de professores ou dos serviços de atendimento da instituição.",
      },
    ],
    checklistHeading: "Checklist rápido",
    checklist: [
      {
        id: "pensar-antes-de-enviar",
        text: "Penso antes de enviar ou compartilhar uma mensagem.",
      },
      {
        id: "nao-expor-colegas",
        text: "Não exponho conversas ou imagens de colegas.",
      },
      {
        id: "evitar-ataques-pessoais",
        text: "Evito comentários ofensivos e ataques pessoais.",
      },
      {
        id: "nao-incentivar-humilhacao",
        text: "Não incentivo situações de humilhação.",
      },
      {
        id: "procurar-ajuda",
        text: "Procuro ajuda quando identifico uma situação grave.",
      },
    ],
  },
  {
    id: "computadores-compartilhados",
    eyebrow: "TEMA 3",
    title: "COMPUTADORES DA BIBLIOTECA E LABORATÓRIO",
    image: {
      src: "/computers.jpg",
      alt: "Computers",
    },
    problem: {
      heading: "O problema",
      paragraphs: [
        "Computadores de bibliotecas e laboratórios são utilizados por várias pessoas. Deixar uma conta conectada, salvar uma senha no navegador ou esquecer um arquivo na pasta de downloads pode expor informações pessoais e acadêmicas.",
        "Fechar apenas a janela do navegador nem sempre encerra a sessão. O próximo usuário pode encontrar a conta ainda conectada.",
      ],
    },
    guidanceHeading: "Como se proteger",
    guidance: [
      {
        id: "nao-salvar-senhas",
        label: "01",
        title: "Não salve senhas",
        body: "Evite salvar senhas em computadores compartilhados. Ao terminar uma atividade, utilize a opção “Sair” ou “Encerrar sessão” em todas as contas acessadas.",
      },
      {
        id: "limpar-arquivos",
        label: "02",
        title: "Limpe arquivos pessoais",
        body: "Apague arquivos pessoais baixados no computador e verifique a lixeira quando necessário. Também evite acessar serviços bancários ou outras informações sensíveis nesses dispositivos.",
      },
      {
        id: "conferir-sessoes",
        label: "03",
        title: "Confira antes de sair",
        body: "Antes de sair do local, confira se o e-mail, o armazenamento em nuvem e a plataforma acadêmica foram realmente desconectados.",
      },
    ],
    checklistHeading: "Checklist rápido",
    checklist: [
      {
        id: "senha-nao-salva",
        text: "Não salvei minha senha no navegador.",
      },
      {
        id: "sessoes-encerradas",
        text: "Encerrei todas as sessões.",
      },
      {
        id: "arquivos-apagados",
        text: "Apaguei os arquivos que baixei.",
      },
      {
        id: "pendrive-retirado",
        text: "Retirei meu pendrive.",
      },
      {
        id: "contas-fechadas",
        text: "Conferi se nenhuma conta permaneceu aberta.",
      },
    ],
  },
  {
    id: "trabalhos-na-nuvem",
    eyebrow: "TEMA 4",
    title: "PROTEÇÃO DE TRABALHOS NO GOOGLE DRIVE OU ONEDRIVE",
    image: {
      src: "/cloud-storage.jpg",
      alt: "Cloud Storage",
    },
    problem: {
      heading: "O problema",
      paragraphs: [
        "Trabalhos acadêmicos podem ser perdidos por falhas no dispositivo, exclusões acidentais ou problemas no compartilhamento. Links configurados de forma incorreta também podem permitir que pessoas não autorizadas visualizem ou alterem um documento.",
        "Durante trabalhos em grupo, arquivos duplicados e versões diferentes podem causar confusão e perda de conteúdo.",
      ],
    },
    guidanceHeading: "Como se proteger",
    guidance: [
      {
        id: "organizar-arquivos",
        label: "01",
        title: "Organize os arquivos",
        body: "Mantenha os trabalhos importantes armazenados em uma conta segura e organize os arquivos em pastas identificadas por disciplina ou projeto.",
      },
      {
        id: "conferir-permissoes",
        label: "02",
        title: "Confira as permissões",
        body: "Antes de compartilhar, confira as permissões. Utilize a opção de visualização quando a pessoa não precisar editar o documento e permita alterações apenas aos integrantes responsáveis.",
      },
      {
        id: "manter-copia-adicional",
        label: "03",
        title: "Mantenha uma cópia adicional",
        body: "Mantenha pelo menos uma cópia adicional dos arquivos mais importantes, especialmente projetos finais, artigos e trabalhos de conclusão de curso.",
      },
    ],
    checklistHeading: "Checklist rápido",
    checklist: [
      {
        id: "trabalhos-organizados",
        text: "Organizei meus trabalhos em pastas.",
      },
      {
        id: "acessos-verificados",
        text: "Verifiquei quem possui acesso aos arquivos.",
      },
      {
        id: "edicao-restrita",
        text: "Permiti edição apenas para as pessoas necessárias.",
      },
      {
        id: "copia-mantida",
        text: "Mantenho uma cópia dos trabalhos importantes.",
      },
      {
        id: "sem-links-publicos-desnecessarios",
        text: "Evito usar links públicos sem necessidade.",
      },
    ],
  },
  {
    id: "golpes-links-falsos",
    eyebrow: "TEMA 5",
    title: "GOLPES DE ESTÁGIO, CURSOS E LINKS FALSOS",
    image: {
      src: "/scam.jpg",
      alt: "Scam",
    },
    problem: {
      heading: "O problema",
      paragraphs: [
        "Estudantes podem receber falsas ofertas de estágio, emprego, bolsas, cursos ou certificados. Essas mensagens podem solicitar pagamentos antecipados, documentos pessoais, senhas ou acesso a links que imitam páginas verdadeiras.",
        "A urgência e a promessa de uma oportunidade muito vantajosa são frequentemente utilizadas para fazer a pessoa agir sem verificar as informações.",
      ],
    },
    guidanceHeading: "Como se proteger",
    guidance: [
      {
        id: "pesquisar-organizacao",
        label: "01",
        title: "Pesquise a organização",
        body: "Pesquise a empresa ou instituição antes de preencher formulários ou enviar documentos. Confira se a oportunidade também aparece nos canais oficiais da organização.",
      },
      {
        id: "desconfiar-de-pagamentos",
        label: "02",
        title: "Desconfie de pagamentos",
        body: "Desconfie de vagas que exigem pagamento para participar do processo seletivo ou que oferecem benefícios muito acima do esperado sem apresentar informações claras.",
      },
      {
        id: "verificar-links-e-remetentes",
        label: "03",
        title: "Verifique links e remetentes",
        body: "Antes de acessar um link, observe o endereço da página e o remetente da mensagem. Quando houver dúvida, entre no site oficial digitando o endereço diretamente no navegador.",
      },
    ],
    checklistHeading: "Checklist rápido",
    checklist: [
      {
        id: "empresa-pesquisada",
        text: "Pesquisei a empresa ou instituição.",
      },
      {
        id: "oportunidade-confirmada",
        text: "Conferi a oportunidade em um canal oficial.",
      },
      {
        id: "sem-pagamento-antecipado",
        text: "Não realizei pagamentos antecipados.",
      },
      {
        id: "link-verificado",
        text: "Verifiquei o endereço do link.",
      },
      {
        id: "documentos-protegidos",
        text: "Evitei enviar documentos antes de confirmar a legitimidade da oferta.",
      },
    ],
  },
];
