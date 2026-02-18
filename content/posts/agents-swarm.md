---
title: "Agents Swarm"
date: 2024-01-15T10:00:00-03:00
draft: false
tags: ["Python", "FastAPI", "Redis", "PostgreSQL", "LLM", "Distributed Systems"]
author: "Lucas Carvalho"
summary: "Event-driven, distributed engine for orchestrating autonomous LLM agents, built with FastAPI, Redis, and PostgreSQL."
---

## The Challenge
Demonstrating orchestration of multiple LLM agents in a scalable way, with distributed state management, fault tolerance, and asynchronous communication, without relying on high-level frameworks like CrewAI or LangGraph.

## The Solution
I built a **Supervisor-Worker** orchestrator from scratch using **Python 3.11+** and **asyncio**. Agent communication is done via **Redis Pub/Sub**, enabling decoupling and horizontal scalability. Shared state (Shared Blackboard) can be persisted in **PostgreSQL**. The HTTP API is exposed with **FastAPI** for mission creation and tracking.

The Supervisor decomposes goals into subtasks and delegates to specialized workers (e.g., ResearcherAgent). Each agent implements a pluggable interface for LLM and search, with timeout handling and error recovery.

### Engineering Highlights
* **Asynchronous Architecture:** High concurrency with asyncio.
* **Event-Driven:** Redis Pub/Sub for inter-agent messaging.
* **Shared Blackboard:** Distributed, persistent state.
* **Fault Tolerance:** Timeouts, retry, and structured logging ready for OpenTelemetry.
* **Pluggable Interface:** Multiple LLM and search providers via Protocol.

### Tech Stack
* **Python 3.11+**
* **FastAPI**
* **Redis** (Pub/Sub)
* **PostgreSQL** (optional state)
* **OpenAI** (LLM)
* **Tavily** (web search, optional)

[Link to Code on GitHub](https://github.com/carvalhxlucas/agents-swarm)
