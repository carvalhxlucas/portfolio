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

export const cases: CaseStudy[] = [
  {
    slug: 'secretaria',
    client: 'Essentia Group',
    sector: { en: 'Healthcare', 'pt-br': 'Saúde' },
    year: '2025',
    title: {
      en: 'Secretaria — AI Front Desk for Clinics',
      'pt-br': 'Secretaria — Atendimento com IA para Clínicas',
    },
    summary: {
      en: 'Customer service automation for clinics: an AI agent on WhatsApp that handles appointment scheduling, patient questions, and day-to-day front-desk work.',
      'pt-br':
        'Automação de atendimento para clínicas: um agente de IA no WhatsApp que cuida do agendamento de consultas, dúvidas de pacientes e da rotina de recepção.',
    },
    tags: ['Python', 'AI Agents', 'WhatsApp', 'RAG', 'FastAPI', 'LLM'],
    featured: true,
    overview: {
      en: `Clinics spend a large part of the day answering repetitive messages: scheduling, rescheduling, confirming appointments, and clarifying questions about procedures and preparation. The front-desk team becomes a bottleneck, patients wait, and no-shows go unmanaged.

Secretaria was born to automate this routine through the channel patients already use every day: WhatsApp.`,
      'pt-br': `Clínicas gastam boa parte do dia respondendo mensagens repetitivas: agendar, remarcar, confirmar consultas e tirar dúvidas sobre procedimentos e preparos. A recepção vira gargalo, o paciente espera e os no-shows ficam sem gestão.

A Secretaria nasceu para automatizar essa rotina pelo canal que o paciente já usa todo dia: o WhatsApp.`,
    },
    whatItDoes: {
      en: `An AI agent talks to patients on WhatsApp in natural language: it books, reschedules, and confirms appointments directly against the clinic's calendar, answers frequently asked questions grounded in the clinic's own information, and sends reminders to reduce no-shows.

When a conversation requires a human — a sensitive case or an unusual request — the agent hands it off to the team with the full context summarized, so the patient never has to repeat themselves.`,
      'pt-br': `Um agente de IA conversa com os pacientes no WhatsApp em linguagem natural: agenda, remarca e confirma consultas direto na agenda da clínica, responde as dúvidas frequentes com base nas informações da própria clínica e envia lembretes para reduzir faltas.

Quando a conversa exige um humano — um caso sensível ou um pedido fora do padrão — o agente transfere para o time com todo o contexto resumido, sem o paciente precisar repetir nada.`,
    },
    architecture: {
      en: `The agent is built in Python with FastAPI, connected to the WhatsApp API. The LLM orchestration layer gives the agent tools to act on the clinic's scheduling system — checking availability, creating and updating appointments — always with validation steps before confirming anything with the patient.

Clinic-specific knowledge (procedures, preparation instructions, policies) is served through a RAG pipeline, so answers stay grounded in official information instead of model guesses. Every conversation is logged and monitored, feeding continuous improvements to prompts and flows.`,
      'pt-br': `O agente é construído em Python com FastAPI, conectado à API do WhatsApp. A camada de orquestração do LLM dá ao agente ferramentas para agir no sistema de agenda da clínica — consultar disponibilidade, criar e alterar consultas — sempre com etapas de validação antes de confirmar qualquer coisa com o paciente.

O conhecimento específico de cada clínica (procedimentos, preparos, políticas) é servido por um pipeline RAG, garantindo respostas ancoradas em informação oficial em vez de suposições do modelo. Toda conversa é registrada e monitorada, alimentando melhorias contínuas de prompts e fluxos.`,
    },
  },
  {
    slug: 'solvefy-agents',
    client: 'Solvefy',
    sector: { en: 'Technology', 'pt-br': 'Tecnologia' },
    year: '2026',
    title: {
      en: 'Solvefy Agents',
      'pt-br': 'Solvefy Agents',
    },
    summary: {
      en: 'AI agent platform: automations and orchestration of agent squads working together to optimize business processes end to end.',
      'pt-br':
        'Plataforma de agentes de IA: automações e orquestração de squads de agentes trabalhando juntos para otimizar processos de negócio de ponta a ponta.',
    },
    tags: ['AI Agents', 'Orchestration', 'Python', 'LLM', 'Automation'],
    featured: true,
    overview: {
      en: `A single AI agent solves a task; real business processes need several of them working together. Companies that tried isolated bots hit a ceiling fast: no coordination, no shared context, no reliability guarantees.

Solvefy Agents is the platform built to break that ceiling — treating agents as a team, not as isolated tools.`,
      'pt-br': `Um agente de IA sozinho resolve uma tarefa; processos de negócio reais precisam de vários trabalhando juntos. Empresas que tentaram bots isolados bateram no teto rápido: sem coordenação, sem contexto compartilhado, sem garantias de confiabilidade.

O Solvefy Agents é a plataforma construída para quebrar esse teto — tratando agentes como um time, não como ferramentas isoladas.`,
    },
    whatItDoes: {
      en: `The platform lets you build specialized AI agents and orchestrate them as squads: a business process is broken down into steps, and each step is handled by the agent best suited for it — extracting data, talking to systems, making decisions, escalating to humans when needed.

On top of that come ready-to-use automations that plug into the company's existing tools, so processes that used to depend on manual, repetitive work start running on their own, with full visibility of what each agent did and why.`,
      'pt-br': `A plataforma permite criar agentes de IA especializados e orquestrá-los em squads: um processo de negócio é decomposto em etapas, e cada etapa é executada pelo agente mais adequado — extraindo dados, conversando com sistemas, tomando decisões e escalando para humanos quando necessário.

Somam-se a isso automações prontas que se conectam às ferramentas que a empresa já usa, fazendo com que processos que dependiam de trabalho manual e repetitivo passem a rodar sozinhos, com visibilidade total do que cada agente fez e por quê.`,
    },
    architecture: {
      en: `The core is a multi-agent orchestration engine: a supervisor layer decomposes processes into tasks and delegates them to specialized worker agents, with shared state, retries, and timeout handling so long-running workflows finish reliably.

Agents expose pluggable integrations with external systems and are fully observable — every step, tool call, and decision is traced, which makes debugging and auditing agent behavior a first-class feature rather than an afterthought.`,
      'pt-br': `O núcleo é um motor de orquestração multi-agente: uma camada supervisora decompõe processos em tarefas e delega a agentes workers especializados, com estado compartilhado, retries e tratamento de timeout para que workflows longos terminem de forma confiável.

Os agentes expõem integrações plugáveis com sistemas externos e são totalmente observáveis — cada etapa, chamada de ferramenta e decisão é rastreada, o que torna depurar e auditar o comportamento dos agentes um recurso de primeira classe, não um detalhe.`,
    },
  },
  {
    slug: 'kantero',
    client: 'Kantero',
    sector: { en: 'Construction', 'pt-br': 'Construção Civil' },
    year: '2026',
    title: {
      en: 'Kantero — Construction Management with AI',
      'pt-br': 'Kantero — Gestão de Obras com IA',
    },
    summary: {
      en: 'Construction management platform with an AI agent on WhatsApp, bringing job-site updates and project tracking into one place.',
      'pt-br':
        'Plataforma de gestão de obras com um agente de IA no WhatsApp, reunindo as atualizações do canteiro e o acompanhamento do projeto em um só lugar.',
    },
    tags: ['AI Agents', 'WhatsApp', 'Python', 'LLM', 'Automation'],
    featured: true,
    overview: {
      en: `On a construction site, information lives scattered across message groups, spreadsheets, and phone calls. Field teams don't have time for complex software, so project status always arrives late — and decisions get made on outdated data.

Kantero approaches the problem from the channel the job site already uses: WhatsApp, with an AI agent as the bridge between the field and management.`,
      'pt-br': `Em uma obra, a informação vive espalhada em grupos de mensagem, planilhas e ligações. As equipes de campo não têm tempo para softwares complexos, então o status do projeto sempre chega atrasado — e as decisões são tomadas com dados defasados.

O Kantero ataca o problema pelo canal que o canteiro já usa: o WhatsApp, com um agente de IA como ponte entre o campo e a gestão.`,
    },
    whatItDoes: {
      en: `Field teams report progress, log issues, and ask questions by simply messaging the AI agent on WhatsApp — no forms, no new app to learn. The agent interprets each message and turns it into structured project data.

Managers get the other side of the bridge: an up-to-date view of every project on the platform, and the ability to ask the agent for the status of any site and get an answer grounded in what the field actually reported.`,
      'pt-br': `As equipes de campo reportam avanço, registram ocorrências e tiram dúvidas simplesmente mandando mensagem para o agente de IA no WhatsApp — sem formulários, sem aprender um app novo. O agente interpreta cada mensagem e a transforma em dados estruturados do projeto.

Os gestores ficam com o outro lado da ponte: uma visão atualizada de cada obra na plataforma, além de poder perguntar ao agente o status de qualquer canteiro e receber uma resposta baseada no que o campo realmente reportou.`,
    },
    architecture: {
      en: `An AI agent built in Python sits on top of the WhatsApp API, using an LLM to interpret free-form field messages and convert them into structured records — progress updates, issues, and requests — persisted in the platform's database.

The management platform consumes that same data to power dashboards and reports, and the agent answers managers' questions by querying it, keeping a single source of truth between the job site and the office.`,
      'pt-br': `Um agente de IA construído em Python opera sobre a API do WhatsApp, usando um LLM para interpretar as mensagens livres do campo e convertê-las em registros estruturados — avanços, ocorrências e solicitações — persistidos no banco de dados da plataforma.

A plataforma de gestão consome esses mesmos dados para alimentar dashboards e relatórios, e o agente responde às perguntas dos gestores consultando essa base, mantendo uma fonte única de verdade entre o canteiro e o escritório.`,
    },
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}
