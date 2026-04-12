export interface Project {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  coverImage: string;
  coverImageAlt: string;
  githubUrl: string;
  featured?: boolean;
  content: string;
}

export const projects: Project[] = [
  {
    slug: 'agents-swarm',
    title: 'Agents Swarm',
    summary:
      'Event-driven, distributed engine for orchestrating autonomous LLM agents, built with FastAPI, Redis, and PostgreSQL.',
    tags: ['Python', 'FastAPI', 'Redis', 'PostgreSQL', 'LLM', 'Distributed Systems'],
    coverImage: '/images/projects/agents-swarm.svg',
    coverImageAlt: 'Agents Swarm',
    githubUrl: 'https://github.com/carvalhxlucas/agents-swarm',
    featured: true,
    content: `Built a Supervisor-Worker orchestrator from scratch using Python 3.11+ and asyncio. Agent communication is done via Redis Pub/Sub, enabling decoupling and horizontal scalability. Shared state can be persisted in PostgreSQL. The HTTP API is exposed with FastAPI for mission creation and tracking.

The Supervisor decomposes goals into subtasks and delegates to specialized workers. Each agent implements a pluggable interface for LLM and search, with timeout handling and error recovery.`,
  },
  {
    slug: 'enterprise-rag-engine',
    title: 'Enterprise RAG Engine',
    summary:
      'Production-ready RAG API with Hybrid Search (Vector + Keyword), Redis caching for cost optimization, and source citations.',
    tags: ['Python', 'FastAPI', 'LangChain', 'RAG', 'Docker', 'Redis'],
    coverImage: '/images/projects/enterprise-rag-engine.svg',
    coverImageAlt: 'Enterprise RAG Engine',
    githubUrl: 'https://github.com/carvalhxlucas/enterprise-rag-engine',
    featured: true,
    content: `Developed a full Python API with FastAPI, using LangChain to orchestrate the RAG pipeline. The system combines vector and keyword search (Hybrid Search) to improve relevance of retrieved documents. Redis is used as a cache layer to reduce repeated calls to the model and vector store. Responses include source citations for auditability.`,
  },
  {
    slug: 'llm-telemetry-pipeline',
    title: 'LLM Telemetry Pipeline',
    summary:
      'High-throughput observability engine for LLMs — SDK → FastAPI Collector → RabbitMQ → ClickHouse, processing thousands of spans per second.',
    tags: ['Python', 'FastAPI', 'RabbitMQ', 'ClickHouse', 'OpenTelemetry', 'Observability'],
    coverImage: '/images/projects/llm-telemetry-pipeline.svg',
    coverImageAlt: 'LLM Telemetry Pipeline',
    githubUrl: 'https://github.com/carvalhxlucas/llm-telemetry-pipeline',
    featured: true,
    content: `Engineered a high-throughput observability pipeline for LLM workloads. The architecture handles thousands of telemetry spans per second with sub-100ms latency, using RabbitMQ for buffering and ClickHouse for fast analytical queries.`,
  },
  {
    slug: 'market-radar-agent',
    title: 'Market Radar Agent',
    summary:
      'Autonomous agent for monitoring and analyzing market data with LLM-based insights and a modular, pluggable architecture.',
    tags: ['Python', 'LLM', 'Agents', 'Market Data', 'Automation'],
    coverImage: '/images/projects/market-radar-agent.svg',
    coverImageAlt: 'Market Radar Agent',
    githubUrl: 'https://github.com/carvalhxlucas/market-radar-agent',
    content: `An autonomous agent that monitors market data sources and generates LLM-powered insights. Built with a modular architecture for pluggable data sources, enabling easy extension to new markets and data providers.`,
  },
  {
    slug: 'code-challenge-generator',
    title: 'Code Challenge Generator',
    summary:
      'AI tool that generates customized technical interview challenges using LangChain, GPT-4o, and a Streamlit interface.',
    tags: ['Python', 'LangChain', 'OpenAI', 'Streamlit', 'AI Engineering'],
    coverImage: '/images/projects/code-challenge-generator.svg',
    coverImageAlt: 'Code Challenge Generator',
    githubUrl: 'https://github.com/carvalhxlucas/code-challenge-generator',
    content: `An AI engineering tool that generates technical interview challenges on demand. Uses LangChain for LLM orchestration and Pydantic V2 for structured output validation. The Streamlit interface allows configuring difficulty, topic, and programming language.`,
  },
  {
    slug: 'tuya-agentic-vacuum',
    title: 'Tuya Agentic Vacuum',
    summary:
      'Control a Tuya-compatible robot vacuum via natural language through Telegram — text or voice — powered by a local AI agent running on Ollama.',
    tags: ['Python', 'FastAPI', 'Telegram Bot', 'Ollama', 'Tuya IoT', 'AI Agents'],
    coverImage: '/images/projects/tuya-agentic-vacuum.svg',
    coverImageAlt: 'Tuya Agentic Vacuum',
    githubUrl: 'https://github.com/carvalhxlucas/tuya-agentic-vacuum',
    content: `Built a multi-tier AI agent that bridges Telegram and the Tuya Open Platform API, allowing a robot vacuum to be controlled entirely through natural language. The agent resolves commands using Ollama locally first (recommended model: qwen2.5:3b), falling back to OpenAI and then a regex engine — making it fully operational without cloud AI.

Voice messages are transcribed via OpenAI Whisper before being processed. Supports 7 cleaning modes (smart, random, spiral, wall_follow, mop, left_bow, right_bow) and multilingual commands. Device discovery is handled dynamically through the /devices bot command, removing the need to hardcode device IDs.`,
  },
  {
    slug: 'skill-seed',
    title: 'SkillSeed',
    summary:
      'Decentralized network where AI agents teach and learn specialized skills from each other — the npm for AI agent skills.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'MCP', 'AI Agents'],
    coverImage: '/images/projects/skill-seed.svg',
    coverImageAlt: 'SkillSeed',
    githubUrl: 'https://github.com/carvalhxlucas/skill-seed',
    featured: true,
    content: `Built a decentralized skill-sharing network for AI agents. "Seeders" publish validated capabilities that "growers" can acquire through an automated skill transfer protocol — modeled after package managers like npm but for agent skills.

The core is a Prompt Distillation Protocol that converts curricula into expert system prompts, paired with a dual evaluation system: public evals for continuous improvement and shadow evals for integrity checks. Seeders self-evolve based on learner performance feedback. Skills are version-controlled and hot-reloadable from YAML without restarts.

Exposes three integration surfaces: a Claude Code MCP server, a Python SDK, and a REST API — making it compatible with LangChain, LangGraph, CrewAI, AutoGen, and custom agent frameworks.`,
  },
  {
    slug: 'cryptodash',
    title: 'CryptoDash',
    summary:
      'Modular cryptocurrency dashboard built in Python that aggregates and displays crypto market data in a unified interface.',
    tags: ['Python', 'Dashboard', 'Cryptocurrency'],
    coverImage: '/images/projects/cryptodash.svg',
    coverImageAlt: 'CryptoDash',
    githubUrl: 'https://github.com/carvalhxlucas/cryptodash',
    content: `A modular cryptocurrency dashboard that aggregates live market data from multiple sources into a clean, unified interface. Built with a component-based architecture in Python.`,
  },
];
