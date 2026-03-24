export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: 'Essentia Group',
    role: 'Full Stack AI Developer (Mid-level)',
    location: 'Palhoça, Brazil',
    period: '09/2025 – Present',
    highlights: [
      'Architected and developed intelligent patient support assistants using RAG (Retrieval-Augmented Generation), integrating LLMs and Vector Databases to automate triage workflows.',
      'Designed scalable APIs to orchestrate communication between foundation models (LLMs), proprietary databases, and legacy systems, focusing on low latency and reduced hallucinations.',
      'Spearheaded the adoption of AI-assisted coding tools within the engineering team, optimizing the SDLC and accelerating delivery speed.',
      'Built secure, responsive web applications for healthcare management using Node.js and Angular, ensuring compliance with sensitive medical data regulations.',
      'Optimized CI/CD pipelines and Docker containerization for mission-critical healthcare applications.',
    ],
  },
  {
    company: 'LOFT',
    role: 'Fullstack Developer | System Analyst',
    location: 'São Paulo, Brazil',
    period: '08/2022 – 08/2025',
    highlights: [
      'Developed and optimized complex SQL scripts for large-scale data manipulation and extraction, ensuring reliability for business intelligence and analytics.',
      'Led the migration of legacy on-premise workloads to AWS infrastructure, designing scalable, high-availability environments focused on data integrity.',
      'Designed and implemented Python automation solutions to reduce operational bottlenecks and increase team efficiency.',
      'Conducted root cause analysis of critical production applications using Datadog, collaborating on bug fixes and performance optimization.',
      'Acted as a technical reference for junior developers, conducting code reviews and disseminating Python best practices.',
    ],
  },
  {
    company: 'Vista Software',
    role: 'Support Analyst',
    location: 'São José, Brazil',
    period: '01/2021 – 08/2022',
    highlights: [
      'Developed automation scripts to generate critical business data, reducing manual effort and increasing data accuracy.',
      'Executed complex SQL queries for data extraction and analysis, providing technical insights to support client business logic.',
      'Handled high-complexity technical demands, troubleshooting infrastructure and software issues directly with the engineering team.',
    ],
  },
  {
    company: 'ECG Sistemas',
    role: 'Customer Support Analyst',
    location: 'Palhoça, Brazil',
    period: '11/2017 – 10/2020',
    highlights: [
      'Provided specialized support, diagnosing issues and guiding clients on system best practices.',
      'Acted as liaison between end-users and the Engineering team, documenting bugs and validating fixes.',
    ],
  },
  {
    company: 'MedGoldman',
    role: 'Assistant IT Manager',
    location: 'São José, Brazil',
    period: '03/2015 – 08/2017',
    highlights: [
      'Managed internal Windows and Linux servers, ensuring uptime and network security.',
      'Maintained and configured internal network, hardware assets, and handled technical troubleshooting.',
    ],
  },
];
