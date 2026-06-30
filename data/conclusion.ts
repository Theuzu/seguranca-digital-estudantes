export type EvaluationContent = {
  title: string;
  paragraphs: readonly [string, string];
  actionLabel: "Responder ao formulário";
  formUrl: string | null;
};

export type ThankYouContent = {
  title: "Agradecimento";
  paragraphs: readonly [string, string];
};

export type ConclusionContent = {
  id: "conclusao";
  label: "FINALIZAÇÃO";
  title: "Pequenos cuidados fazem diferença";
  closingParagraphs: readonly [string, string];
  evaluation: EvaluationContent;
  thanks: ThankYouContent;
  academicNote: string;
};

const GOOGLE_FORMS_HOSTS = new Set(["docs.google.com", "forms.gle"]);

export function isValidGoogleFormsUrl(url: string | null): url is string {
  if (!url || url === "#" || url === "[INSERIR LINK DO GOOGLE FORMS]") {
    return false;
  }

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol !== "https:") {
      return false;
    }

    if (!GOOGLE_FORMS_HOSTS.has(parsedUrl.hostname)) {
      return false;
    }

    if (parsedUrl.hostname === "docs.google.com") {
      return parsedUrl.pathname.startsWith("/forms/");
    }

    return parsedUrl.hostname === "forms.gle" && parsedUrl.pathname.length > 1;
  } catch {
    return false;
  }
}

export const conclusionContent: ConclusionContent = {
  id: "conclusao",
  label: "FINALIZAÇÃO",
  title: "Pequenos cuidados fazem diferença",
  closingParagraphs: [
    "A segurança digital não depende apenas de ferramentas avançadas. Hábitos simples, são fundamentais, para proteger dados pessoais e acadêmicos.",
    "Além disso, contribuem para uma convivência digital respeitosa e para um ambiente acadêmico mais seguro para todos.",
  ],
  evaluation: {
    title: "Ajude a avaliar este projeto",
    paragraphs: [
      "Sua opinião é importante para avaliar se o conteúdo foi útil, claro e aplicável ao cotidiano dos estudantes.",
      "O formulário é rápido e suas respostas serão utilizadas exclusivamente para fins acadêmicos.",
    ],
    actionLabel: "Responder ao formulário",
    formUrl: "https://forms.gle/7EU7TUh3xtDYFTC16",
  },
  thanks: {
    title: "Agradecimento",
    paragraphs: [
      "Obrigado por acessar o conteúdo! ;)",
      "Compartilhe estas orientações e ajude a promover práticas digitais mais seguras e responsáveis.",
    ],
  },
  academicNote:
    "Este site foi desenvolvido como parte de uma atividade de extensão acadêmica.",
};
