---
title: "Enterprise RAG Engine"
date: 2023-12-04T14:00:00-03:00
draft: false
tags: ["Python", "FastAPI", "LangChain", "RAG", "Docker", "Redis"]
author: "Lucas Carvalho"
summary: "Production-ready RAG API with Hybrid Search (Vector + Keyword), Redis caching for cost optimization, and source citations."
cover:
  image: /images/projects/enterprise-rag-engine.svg
  alt: "Enterprise RAG Engine"
---

## The Challenge
Building a scalable, production-ready RAG (Retrieval-Augmented Generation) API with hybrid search for better recall, cost control via caching, and traceability of sources used in generated answers.

## The Solution
I developed a full **Python** API with **FastAPI**, using **LangChain** to orchestrate the RAG pipeline. The system combines vector and keyword search (Hybrid Search) to improve relevance of retrieved documents. **Redis** is used as a cache layer to reduce repeated calls to the model and vector store. Responses include source citations for auditability and reliability.

The application is containerized with **Docker** and includes a TypeScript frontend for demos and testing.

### Engineering Highlights
* **Hybrid Search:** Combination of vector and term-based search for better coverage and precision.
* **Redis Caching:** Reduced cost and latency for recurring queries.
* **Source Citations:** Traceability of sources used to generate answers.
* **Decoupled Architecture:** Backend (FastAPI) and frontend separated, ready for production deploy.

### Tech Stack
* **Python** (Backend)
* **FastAPI** (REST API)
* **LangChain** (RAG Orchestration)
* **Redis** (Cache)
* **Docker** (Orchestration)
* **TypeScript** (Frontend)

[Link to Code on GitHub](https://github.com/carvalhxlucas/enterprise-rag-engine)
