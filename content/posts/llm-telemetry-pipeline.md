---
title: "LLM Telemetry Pipeline"
date: 2024-02-01T12:00:00-03:00
draft: false
tags: ["Python", "FastAPI", "RabbitMQ", "ClickHouse", "OpenTelemetry", "Observability"]
author: "Lucas Carvalho"
summary: "High-throughput, decoupled observability engine for LLMs, built with FastAPI, RabbitMQ, and ClickHouse using OpenTelemetry standards."
---

## The Challenge
Delivering a self-hosted observability platform for applications that use LLMs (similar to LangSmith or Arize Phoenix), with high-scale ingestion, low latency, and efficient trace analysis.

## The Solution
I designed a decoupled pipeline: an **SDK** instruments LLM calls with the `@llm_trace` decorator, extracting metrics (tokens, latency, cost) and sanitizing sensitive data. Traces are sent to the **Collector** (FastAPI), which publishes asynchronously to **RabbitMQ**. Workers consume in batch and insert into **ClickHouse** (OLAP), with an optimized schema, materialized views for hourly and daily aggregations, and Bloom filter indexes for fast queries.

The format is compatible with **OpenTelemetry**, enabling integration with the existing ecosystem.

### Engineering Highlights
* **High Throughput:** Support for thousands of spans per second.
* **Latency:** Under 100 ms from SDK to ClickHouse.
* **Configurable Batch:** Adjustable batch size and timeout in the worker.
* **SDK with Sanitization:** Removal of API keys and PII in traces.
* **Useful Queries:** Examples for metrics by model, hourly aggregations, and full trace.

### Tech Stack
* **Python 3.11+**
* **FastAPI** (Collector)
* **RabbitMQ** (async buffer)
* **ClickHouse** (storage and analysis)
* **OpenTelemetry** (trace standard)
* **Docker Compose** (orchestration)

[Link to Code on GitHub](https://github.com/carvalhxlucas/llm-telemetry-pipeline)
