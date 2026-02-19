---
title: "AI Code Challenge Generator"
date: 2023-12-09T20:30:00-03:00
draft: false 
tags: ["Python", "LangChain", "OpenAI", "Streamlit", "AI Engineering"]
author: "Lucas Carvalho"
summary: "An AI Engineering tool that generates structured technical interview challenges with hidden test cases validated via Pydantic."
cover:
  image: /images/projects/code-challenge-generator.png
  alt: "Code Challenge Generator"
---

## The Challenge
As a Tech Lead, designing consistent, fair, and rigorous coding challenges for candidates is time-consuming. Furthermore, attempting to use raw LLMs (like ChatGPT) manually often results in inconsistent formatting, making it difficult to automate the process or integrate the output into evaluation platforms. I needed a reliable pipeline that generated not just text, but a strict data structure (JSON) for every challenge.

## The Solution
I built a full-stack **Python** application focused on Prompt Engineering and Structured Outputs.

Unlike a simple chatbot, this system uses **LangChain** to orchestrate the interaction with the LLM (GPT-4o) and **Pydantic** to enforce runtime validation of the output data. This ensures the AI returns a strictly typed object containing the *Title*, *Difficulty*, *Markdown Problem Statement*, and a list of *Hidden Test Cases (Input/Output)*, effectively eliminating formatting hallucinations.

The interface was built using **Streamlit** for rapid prototyping, allowing users to configure parameters such as seniority level, programming language, and specific topics.

### Engineering Highlights
* **Structured Outputs:** Leveraged Pydantic schemas to "tame" the LLM and guarantee data integrity.
* **Modern Python:** utilized **Poetry** for dependency management and strict type hinting.
* **Optimization:** Implemented data caching strategies to reduce API costs and latency.

### Tech Stack
* **LangChain** (AI Orchestration)
* **OpenAI GPT-4o** (Generative Model)
* **Pydantic V2** (Data Validation & Schema)
* **Streamlit** (Frontend/UI)
* **Poetry** (Package Management)

[Link to Code on GitHub](https://github.com/carvalhxlucas/code-challenge-generator)