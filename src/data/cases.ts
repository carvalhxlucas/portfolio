import { type Locale } from '@/i18n/routing';

// Texto localizado por idioma do site.
export type Localized = Record<Locale, string>;

export interface CaseStudy {
  slug: string;
  client: string; // Nome do cliente (ou "Confidencial" se houver NDA)
  sector: Localized; // Segmento do cliente, ex: "Saúde", "Fintech"
  year: string;
  title: Localized;
  summary: Localized; // Resumo curto exibido no card
  tags: string[];
  featured?: boolean;
  // Seções da página de detalhe (parágrafos separados por linha em branco):
  overview: Localized; // Contexto: quem é o cliente e qual era o problema
  whatItDoes: Localized; // O que a solução faz na prática
  architecture: Localized; // Como foi estruturado tecnicamente
  results?: Localized; // Resultados/impacto (opcional)
}

// Substitua o case de exemplo abaixo pelos seus cases reais.
export const cases: CaseStudy[] = [
  {
    slug: 'assistente-atendimento-ia',
    client: 'Confidencial',
    sector: { en: 'Healthcare', 'pt-br': 'Saúde' },
    year: '2025',
    title: {
      en: 'AI Support Assistant with RAG',
      'pt-br': 'Assistente de Atendimento com IA e RAG',
    },
    summary: {
      en: 'Intelligent assistant that answers patient questions grounded in the company knowledge base, reducing support team load.',
      'pt-br':
        'Assistente inteligente que responde dúvidas de pacientes com base no conhecimento da empresa, reduzindo a carga do time de atendimento.',
    },
    tags: ['Python', 'FastAPI', 'RAG', 'LangChain', 'PostgreSQL', 'AWS'],
    featured: true,
    overview: {
      en: `The client's support team received a high volume of repetitive questions, with long response times and inconsistent answers across attendants.

The goal was to build an AI assistant that could answer most questions automatically — always grounded in the company's official documentation, with zero tolerance for hallucinated answers.`,
      'pt-br': `O time de atendimento do cliente recebia um alto volume de dúvidas repetitivas, com tempo de resposta longo e respostas inconsistentes entre atendentes.

O objetivo era construir um assistente de IA capaz de responder a maioria das dúvidas automaticamente — sempre com base na documentação oficial da empresa, sem tolerância a respostas alucinadas.`,
    },
    whatItDoes: {
      en: `The assistant answers user questions in natural language, citing the sources used in each answer. When it doesn't have enough confidence, it hands the conversation off to a human attendant with the full context summarized.

It also gives the operations team a dashboard with the most frequent topics, helping prioritize documentation improvements.`,
      'pt-br': `O assistente responde dúvidas dos usuários em linguagem natural, citando as fontes utilizadas em cada resposta. Quando não tem confiança suficiente, transfere a conversa para um atendente humano com todo o contexto resumido.

Também entrega ao time de operações um painel com os temas mais frequentes, ajudando a priorizar melhorias na documentação.`,
    },
    architecture: {
      en: `The solution was structured as a FastAPI service orchestrating a RAG pipeline with LangChain: document ingestion with semantic chunking, embeddings stored in a vector database, and hybrid search (vector + keyword) for retrieval.

Every answer goes through a grounding validation step before reaching the user. The system runs on AWS with full observability — every interaction is traced, evaluated, and feeds a continuous improvement loop.`,
      'pt-br': `A solução foi estruturada como um serviço FastAPI orquestrando um pipeline RAG com LangChain: ingestão de documentos com chunking semântico, embeddings armazenados em banco vetorial e busca híbrida (vetorial + palavra-chave) para retrieval.

Toda resposta passa por uma etapa de validação de grounding antes de chegar ao usuário. O sistema roda na AWS com observabilidade completa — cada interação é rastreada, avaliada e alimenta um ciclo de melhoria contínua.`,
    },
    results: {
      en: `Over 70% of questions resolved without human intervention, average response time cut from hours to seconds, and consistent answers aligned with official documentation.`,
      'pt-br': `Mais de 70% das dúvidas resolvidas sem intervenção humana, tempo médio de resposta reduzido de horas para segundos e respostas consistentes alinhadas à documentação oficial.`,
    },
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}
