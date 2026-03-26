export interface Course {
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  description: string;
  coverImage: string;
}

export const courses: Course[] = [
  {
    name: 'Advanced Learning Algorithms',
    issuer: 'Stanford University',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/advance-learning-algorithms-stanford.pdf',
    description: 'Neural networks, decision trees and ensemble methods.',
    coverImage: '/images/courses/advance-learning-algorithms-stanford.svg',
  },
  {
    name: 'Deep Learning and Neural Networks',
    issuer: 'IBM',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/deep-learning-and-neural-networks.pdf',
    description: 'Fundamentals of deep learning and neural network architectures.',
    coverImage: '/images/courses/deep-learning-and-neural-networks.svg',
  },
  {
    name: 'Foundations of Cybersecurity',
    issuer: 'Google',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/foundations-of-cybersecurity-google.pdf',
    description: 'Introduction to cybersecurity concepts and practices.',
    coverImage: '/images/courses/foundations-of-cybersecurity-google.svg',
  },
  {
    name: 'Keras and TensorFlow',
    issuer: 'IBM',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/keras-and-tensorflow-ibm.pdf',
    description: 'Building and training models with Keras and TensorFlow.',
    coverImage: '/images/courses/keras-and-tensorflow-ibm.svg',
  },
  {
    name: 'Machine Learning with Python',
    issuer: 'IBM',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/machine-learning-with-python-ibm.pdf',
    description: 'Machine learning fundamentals and Python implementation.',
    coverImage: '/images/courses/machine-learning-with-python-ibm.svg',
  },
  {
    name: 'Neural Networks and PyTorch',
    issuer: 'IBM',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/neural-networks-and-pytorch.pdf',
    description: 'Neural networks development with PyTorch framework.',
    coverImage: '/images/courses/neural-networks-and-pytorch.svg',
  },
  {
    name: 'Programming in Python',
    issuer: 'Meta',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/programming-in-python-meta.pdf',
    description: 'Python programming fundamentals and best practices.',
    coverImage: '/images/courses/programming-in-python-meta.svg',
  },
  {
    name: 'Prompt Engineering Basics',
    issuer: 'IBM',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/prompt-engineering-basics-ibm.pdf',
    description: 'Introduction to prompt engineering for LLMs.',
    coverImage: '/images/courses/prompt-engineering-basics-ibm.svg',
  },
  {
    name: 'Prompt Engineering',
    issuer: 'Rocketseat',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/prompt-engineering-rocketseat.pdf',
    description: 'Prompt engineering techniques and applications.',
    coverImage: '/images/courses/prompt-engineering-rocketseat.svg',
  },
  {
    name: 'Regression and Classification',
    issuer: 'Stanford University',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/regression-and-classification-stanford.pdf',
    description: 'Supervised learning, regression and classification algorithms.',
    coverImage: '/images/courses/regression-and-classification-stanford.svg',
  },
  {
    name: 'Security Operations Center',
    issuer: 'IBM',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/security-operations-center-ibm.pdf',
    description: 'SOC fundamentals and security monitoring.',
    coverImage: '/images/courses/security-operations-center-ibm.svg',
  },
  {
    name: 'Unsupervised Learning',
    issuer: 'Stanford University',
    date: '2024-01-01',
    credentialUrl: '/courses/certificates/unsupervised-learning-stanford.pdf',
    description: 'Clustering, dimensionality reduction and unsupervised methods.',
    coverImage: '/images/courses/unsupervised-learning-stanford.svg',
  },
  {
    name: 'Claude Code in Action',
    issuer: 'Anthropic',
    date: '2026-03-24',
    credentialUrl: 'https://verify.skilljar.com/c/gsrzennawisr',
    description: 'AI coding assistant architecture, tool use systems, context management and GitHub integration.',
    coverImage: '/images/courses/claude-code-in-action-anthropic.svg',
  },
  {
    name: 'Introduction to Model Context Protocol',
    issuer: 'Anthropic',
    date: '2026-03-25',
    credentialUrl: 'https://verify.skilljar.com/c/ss556kniyr4z',
    description: 'Building MCP servers and clients from scratch, covering tools, resources and prompts for connecting Claude with external services.',
    coverImage: '/images/courses/introduction-to-mcp-anthropic.svg',
  },
  {
    name: 'Model Context Protocol: Advanced Topics',
    issuer: 'Anthropic',
    date: '2026-03-26',
    credentialUrl: 'https://verify.skilljar.com/c/6c328ikixbg2',
    description: 'Advanced MCP development covering server-client communication, transport mechanisms, sampling, notifications and production deployment.',
    coverImage: '/images/courses/mcp-advanced-topics-anthropic.svg',
  },
];
