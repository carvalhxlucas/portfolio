export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: 'Solvefy',
    role: 'Senior AI Engineer',
    location: 'Florianópolis, SC, Brazil',
    period: '04/2026 – Present',
    highlights: [
      'Promoted to Senior AI Engineer, leading the design of agentic AI systems focused on autonomous, multi-step reasoning and task execution.',
      'Deepening expertise in Agentic AI architectures, building on production RAG and LLM orchestration experience to ship reliable, hallucination-resistant systems.',
    ],
  },
  {
    company: 'Essentia Group',
    role: 'Intermediate AI Developer',
    location: 'Palhoça, SC, Brazil',
    period: '09/2025 – 04/2026',
    highlights: [
      "Architected and developed intelligent patient support assistants using RAG (Retrieval-Augmented Generation), leading the integration of LLMs and Vector Databases to automate triage workflows and reduce operational load for clinical and administrative teams.",
      'Designed robust, scalable APIs to orchestrate communication between foundation models, proprietary databases, and legacy systems, focusing on low latency and reducing hallucinations in AI responses.',
      "Spearheaded the adoption of AI-assisted coding tools (such as Cursor) within the engineering team's workflow, optimizing the SDLC and fostering an AI-driven productivity culture.",
      'Assisted in building secure, responsive web applications for healthcare management using Node.js and Angular, ensuring compliance with sensitive medical data regulations.',
      'Optimized CI/CD pipelines and Docker containerization for mission-critical healthcare applications.',
    ],
  },
  {
    company: 'Loft',
    role: 'Full Stack Developer | System Analyst',
    location: 'São Paulo, SP, Brazil',
    period: '08/2022 – 08/2025',
    highlights: [
      'Developed and optimized complex SQL scripts for large-scale data manipulation and extraction, ensuring reliability for business intelligence and downstream analytics.',
      'Led the migration of legacy on-premise workloads to AWS infrastructure, designing scalable, high-availability environments focused on data integrity.',
      'Designed and implemented internal Python automation solutions to reduce operational bottlenecks and increase team efficiency.',
      'Conducted root cause analysis of critical production applications using Datadog, collaborating on bug fixes and performance optimization.',
      'Acted as a technical reference for junior developers, conducting code reviews and disseminating software engineering and Python best practices.',
    ],
  },
  {
    company: 'Vista Software',
    role: 'Customer Support Analyst',
    location: 'São José, SC, Brazil',
    period: '03/2021 – 08/2022',
    highlights: [
      'Developed automation scripts to generate critical business data, reducing manual effort and increasing data accuracy for clients.',
      'Executed complex SQL queries (MySQL) for data extraction and analysis, providing technical insights to support client business logic.',
      'Handled high-complexity technical demands, troubleshooting infrastructure and software issues directly with the engineering team.',
      'Acted as a reference point for the team, mentoring junior members on resolving complex incidents and sharing best practices.',
    ],
  },
  {
    company: 'ECG Sistemas',
    role: 'Customer Support',
    location: 'Palhoça, SC, Brazil',
    period: '11/2017 – 10/2020',
    highlights: [
      "Provided specialized support for the company's software, diagnosing issues and guiding clients on system best practices.",
      'Acted as a liaison between end-users and the Engineering team, documenting bugs and validating fixes to ensure software quality.',
    ],
  },
  {
    company: 'MedGoldman',
    role: 'Assistant IT Manager',
    location: 'São José, SC, Brazil',
    period: '03/2015 – 08/2017',
    highlights: [
      "Managed internal Windows and Linux servers, ensuring uptime and network security for the company's operations.",
      'Responsible for the maintenance and configuration of the internal network, hardware assets, and technical troubleshooting.',
    ],
  },
];
