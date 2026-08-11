export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  description: string;
  badgeUrl?: string; // Badge oficial (Credly etc.) — sem ele o card usa um ícone padrão
}

export const certifications: Certification[] = [
  {
    name: 'Generative AI Fundamentals',
    issuer: 'Databricks',
    date: '2025-02-01',
    badgeUrl:
      'https://images.credly.com/size/80x80/images/8da33d20-70e4-4820-9dfa-b4c9b9fd6f15/2fdb8d85-57f2-475d-a423-ccd8e04c95db_cached_image_20260220-32-1d5nvi.png',
    credentialUrl:
      'https://api.accredible.com/v1/obi/badge_assertions/e152a94a-238a-4bde-8884-0c660bb41470',
    description: 'Fundamentals of generative AI, LLMs, and responsible AI practices.',
  },
  {
    name: 'AI Agent Fundamentals',
    issuer: 'Databricks',
    date: '2025-02-01',
    badgeUrl:
      'https://images.credly.com/size/80x80/images/6c8b0d83-7ad4-4051-923a-40c34e0d083c/952d5d66-6f26-49b5-a78f-c3bf6da40a3f_cached_image_20260220-32-oqbue4.png',
    credentialUrl:
      'https://api.accredible.com/v1/obi/badge_assertions/c9bbffda-c442-4dbc-9a4b-b4ca329d7f68',
    description: 'Building and orchestrating AI agents, tools, and workflows.',
  },
  {
    name: 'Machine Learning with Python',
    issuer: 'IBM',
    date: '2025-02-25',
    badgeUrl:
      'https://images.credly.com/size/80x80/images/56c60565-e945-4bcd-b8a6-9b2f43e1b0d9/Coursera_20Machine_20Learning_20with_20Python_20V2.png',
    credentialUrl:
      'https://www.credly.com/badges/6a242996-aab4-493e-8c3d-58ef6938808b/public_url',
    description: 'Certification in Machine Learning with Python.',
  },
  {
    name: 'Machine Learning Specialization',
    issuer: 'Stanford University',
    date: '2024-12-01',
    badgeUrl: 'https://identity.stanford.edu/wp-content/uploads/sites/3/2020/07/block-s-right.png',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/ZWOJF1P8O47T',
    description: 'Supervised learning, unsupervised learning, and best practices in ML.',
  },
  {
    name: 'Software Engineering Specialization',
    issuer: 'The Hong Kong University of Science and Technology',
    date: '2025-10-01',
    badgeUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d0/The_Hong_Kong_University_of_Science_and_Technology_Logo.svg',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/2YHYF38JNKUF',
    description: 'Core software engineering principles, design patterns, and development practices.',
  },
  {
    name: 'Advanced Learning Algorithms',
    issuer: 'Stanford University',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/advance-learning-algorithms-stanford.pdf',
    description: 'Neural networks, decision trees and ensemble methods.',
  },
  {
    name: 'Deep Learning and Neural Networks',
    issuer: 'IBM',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/deep-learning-and-neural-networks.pdf',
    description: 'Fundamentals of deep learning and neural network architectures.',
  },
  {
    name: 'Foundations of Cybersecurity',
    issuer: 'Google',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/foundations-of-cybersecurity-google.pdf',
    description: 'Introduction to cybersecurity concepts and practices.',
  },
  {
    name: 'Keras and TensorFlow',
    issuer: 'IBM',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/keras-and-tensorflow-ibm.pdf',
    description: 'Building and training models with Keras and TensorFlow.',
  },
  {
    name: 'Neural Networks and PyTorch',
    issuer: 'IBM',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/neural-networks-and-pytorch.pdf',
    description: 'Neural networks development with PyTorch framework.',
  },
  {
    name: 'Programming in Python',
    issuer: 'Meta',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/programming-in-python-meta.pdf',
    description: 'Python programming fundamentals and best practices.',
  },
  {
    name: 'Prompt Engineering Basics',
    issuer: 'IBM',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/prompt-engineering-basics-ibm.pdf',
    description: 'Introduction to prompt engineering for LLMs.',
  },
  {
    name: 'Prompt Engineering',
    issuer: 'Rocketseat',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/prompt-engineering-rocketseat.pdf',
    description: 'Prompt engineering techniques and applications.',
  },
  {
    name: 'Regression and Classification',
    issuer: 'Stanford University',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/regression-and-classification-stanford.pdf',
    description: 'Supervised learning, regression and classification algorithms.',
  },
  {
    name: 'Security Operations Center',
    issuer: 'IBM',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/security-operations-center-ibm.pdf',
    description: 'SOC fundamentals and security monitoring.',
  },
  {
    name: 'Unsupervised Learning',
    issuer: 'Stanford University',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/unsupervised-learning-stanford.pdf',
    description: 'Clustering, dimensionality reduction and unsupervised methods.',
  },
  {
    name: 'Claude Code in Action',
    issuer: 'Anthropic',
    date: '2026-03-24',
    credentialUrl: 'https://verify.skilljar.com/c/gsrzennawisr',
    description: 'AI coding assistant architecture, tool use systems, context management and GitHub integration.',
  },
  {
    name: 'Introduction to Model Context Protocol',
    issuer: 'Anthropic',
    date: '2026-03-25',
    credentialUrl: 'https://verify.skilljar.com/c/ss556kniyr4z',
    description: 'Building MCP servers and clients from scratch, covering tools, resources and prompts for connecting Claude with external services.',
  },
  {
    name: 'Model Context Protocol: Advanced Topics',
    issuer: 'Anthropic',
    date: '2026-03-26',
    credentialUrl: 'https://verify.skilljar.com/c/6c328ikixbg2',
    description: 'Advanced MCP development covering server-client communication, transport mechanisms, sampling, notifications and production deployment.',
  },
];
