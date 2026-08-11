import { type Locale } from '@/i18n/routing';

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: Record<Locale, string[]>;
}

export const experience: ExperienceItem[] = [
  {
    company: 'Solvefy',
    role: 'Senior AI Engineer',
    location: 'Florianópolis, SC, Brazil',
    period: '04/2026 – Present',
    highlights: {
      en: [
        'Promoted to Senior AI Engineer, leading the design of agentic AI systems focused on autonomous, multi-step reasoning and task execution.',
        'Deepening expertise in Agentic AI architectures, building on production RAG and LLM orchestration experience to ship reliable, hallucination-resistant systems.',
      ],
      'pt-br': [
        'Promovido a Engenheiro de IA Sênior, liderando o design de sistemas de IA agêntica focados em raciocínio autônomo multi-etapas e execução de tarefas.',
        'Aprofundando expertise em arquiteturas de IA Agêntica, construindo sobre a experiência com RAG e orquestração de LLMs em produção para entregar sistemas confiáveis e resistentes a alucinações.',
      ],
    },
  },
  {
    company: 'Essentia Group',
    role: 'Intermediate AI Developer',
    location: 'Palhoça, SC, Brazil',
    period: '09/2025 – 04/2026',
    highlights: {
      en: [
        "Architected and developed intelligent patient support assistants using RAG (Retrieval-Augmented Generation), leading the integration of LLMs and Vector Databases to automate triage workflows and reduce operational load for clinical and administrative teams.",
        'Designed robust, scalable APIs to orchestrate communication between foundation models, proprietary databases, and legacy systems, focusing on low latency and reducing hallucinations in AI responses.',
        "Spearheaded the adoption of AI-assisted coding tools (such as Cursor) within the engineering team's workflow, optimizing the SDLC and fostering an AI-driven productivity culture.",
        'Assisted in building secure, responsive web applications for healthcare management using Node.js and Angular, ensuring compliance with sensitive medical data regulations.',
        'Optimized CI/CD pipelines and Docker containerization for mission-critical healthcare applications.',
      ],
      'pt-br': [
        'Arquitetei e desenvolvi assistentes inteligentes de suporte ao paciente usando RAG (Retrieval-Augmented Generation), liderando a integração de LLMs e Bancos de Dados Vetoriais para automatizar fluxos de triagem e reduzir a carga operacional dos times clínicos e administrativos.',
        'Projetei APIs robustas e escaláveis para orquestrar a comunicação entre foundation models, bancos de dados proprietários e sistemas legados, com foco em baixa latência e redução de alucinações nas respostas de IA.',
        'Liderei a adoção de ferramentas de codificação assistida por IA (como o Cursor) no fluxo de trabalho do time de engenharia, otimizando o SDLC e fomentando uma cultura de produtividade orientada por IA.',
        'Auxiliei na construção de aplicações web seguras e responsivas para gestão de saúde usando Node.js e Angular, garantindo conformidade com as regulações de dados médicos sensíveis.',
        'Otimizei pipelines de CI/CD e conteinerização com Docker para aplicações de saúde de missão crítica.',
      ],
    },
  },
  {
    company: 'Loft',
    role: 'Full Stack Developer | System Analyst',
    location: 'São Paulo, SP, Brazil',
    period: '08/2022 – 08/2025',
    highlights: {
      en: [
        'Developed and optimized complex SQL scripts for large-scale data manipulation and extraction, ensuring reliability for business intelligence and downstream analytics.',
        'Led the migration of legacy on-premise workloads to AWS infrastructure, designing scalable, high-availability environments focused on data integrity.',
        'Designed and implemented internal Python automation solutions to reduce operational bottlenecks and increase team efficiency.',
        'Conducted root cause analysis of critical production applications using Datadog, collaborating on bug fixes and performance optimization.',
        'Acted as a technical reference for junior developers, conducting code reviews and disseminating software engineering and Python best practices.',
      ],
      'pt-br': [
        'Desenvolvi e otimizei scripts SQL complexos para manipulação e extração de dados em larga escala, garantindo confiabilidade para business intelligence e análises downstream.',
        'Liderei a migração de workloads legados on-premise para a infraestrutura AWS, projetando ambientes escaláveis e de alta disponibilidade com foco em integridade de dados.',
        'Projetei e implementei soluções internas de automação em Python para reduzir gargalos operacionais e aumentar a eficiência do time.',
        'Conduzi análises de causa raiz em aplicações críticas de produção usando Datadog, colaborando em correções de bugs e otimização de performance.',
        'Atuei como referência técnica para desenvolvedores juniores, conduzindo code reviews e disseminando boas práticas de engenharia de software e Python.',
      ],
    },
  },
  {
    company: 'Vista Software',
    role: 'Customer Support Analyst',
    location: 'São José, SC, Brazil',
    period: '03/2021 – 08/2022',
    highlights: {
      en: [
        'Developed automation scripts to generate critical business data, reducing manual effort and increasing data accuracy for clients.',
        'Executed complex SQL queries (MySQL) for data extraction and analysis, providing technical insights to support client business logic.',
        'Handled high-complexity technical demands, troubleshooting infrastructure and software issues directly with the engineering team.',
        'Acted as a reference point for the team, mentoring junior members on resolving complex incidents and sharing best practices.',
      ],
      'pt-br': [
        'Desenvolvi scripts de automação para gerar dados críticos de negócio, reduzindo o esforço manual e aumentando a precisão dos dados para os clientes.',
        'Executei queries SQL complexas (MySQL) para extração e análise de dados, fornecendo insights técnicos para apoiar a lógica de negócio dos clientes.',
        'Atendi demandas técnicas de alta complexidade, solucionando problemas de infraestrutura e software diretamente com o time de engenharia.',
        'Atuei como ponto de referência para o time, mentorando membros juniores na resolução de incidentes complexos e compartilhando boas práticas.',
      ],
    },
  },
  {
    company: 'ECG Sistemas',
    role: 'Customer Support',
    location: 'Palhoça, SC, Brazil',
    period: '11/2017 – 10/2020',
    highlights: {
      en: [
        "Provided specialized support for the company's software, diagnosing issues and guiding clients on system best practices.",
        'Acted as a liaison between end-users and the Engineering team, documenting bugs and validating fixes to ensure software quality.',
      ],
      'pt-br': [
        'Prestei suporte especializado ao software da empresa, diagnosticando problemas e orientando clientes sobre boas práticas do sistema.',
        'Atuei como ponte entre os usuários finais e o time de Engenharia, documentando bugs e validando correções para garantir a qualidade do software.',
      ],
    },
  },
  {
    company: 'MedGoldman',
    role: 'Assistant IT Manager',
    location: 'São José, SC, Brazil',
    period: '03/2015 – 08/2017',
    highlights: {
      en: [
        "Managed internal Windows and Linux servers, ensuring uptime and network security for the company's operations.",
        'Responsible for the maintenance and configuration of the internal network, hardware assets, and technical troubleshooting.',
      ],
      'pt-br': [
        'Gerenciei servidores internos Windows e Linux, garantindo uptime e segurança de rede para as operações da empresa.',
        'Responsável pela manutenção e configuração da rede interna, dos ativos de hardware e pela resolução de problemas técnicos.',
      ],
    },
  },
];
