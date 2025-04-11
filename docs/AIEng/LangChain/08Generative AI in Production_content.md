---
sidebar_position: 1
tags: ["LLM apps", "MLOps", "ethical deployment", "model evaluation", "LangChain", "LLM deployment", "FastAPI", "ethical AI", "Ray", "observability", "LangSmith", "PromptWatch"]
title: "08Generative AI in Production"
---

## summary

- The chapter discusses the transition of LLM applications from research to real-world deployment, highlighting the challenges and best practices involved.
- Key considerations for production readiness include data management, ethical deployment, resource management, performance management, interpretability, data security, model behavior standards, and mitigating hallucination.
- MLOps and its specialized sub-categories like LLMOps, LMOps, Foundational Model Orchestration (FOMO), and ModelOps are introduced as paradigms for deploying and maintaining machine learning models in production.
- The chapter emphasizes the importance of evaluating LLM apps before deployment, detailing offline evaluation methods and standardized benchmarks for assessing model performance.
- LangChain provides tools for evaluating LLM outputs, including pairwise string comparisons and criteria-based evaluations, to ensure models meet specific standards before production.
- Practical steps for evaluation include creating an evaluator, selecting a dataset, defining models to compare, generating responses, and evaluating pairs to determine the preferred model.
- The chapter references a GitHub repository for code examples and updates, encouraging readers to engage with the community for support and discussion.
- An image description highlights a graphical comparison of generative AI models on various performance metrics, providing insights into their strengths and weaknesses.
- Final takeaways include the necessity of thoughtful planning and preparation for deploying generative AI applications responsibly and effectively.
- The chapter focuses on the deployment and evaluation of LLM applications in production, highlighting the importance of ethical considerations, performance management, and the use of modern frameworks.
- LangChain supports nuanced comparison of LLM outputs through predefined principles and string/semantic comparison metrics, enabling detailed evaluation of model performance.
- LangSmith is introduced as a tool for comprehensive benchmarking and evaluation, facilitating the transition of LLM apps from prototype to production with features like data annotation queues.
- Deployment strategies for LLM applications are discussed, including the use of external LLM providers, self-hosting open-source models, and leveraging frameworks like FastAPI and Lanarky for web server deployment.
- The chapter provides a detailed overview of services and frameworks available for deploying LLM applications, emphasizing the need for scalable infrastructure, low latency, and persistent storage.
- Practical steps for deploying a chat service web server using FastAPI and Lanarky are outlined, including code examples for setting up a ConversationChain instance with an LLM model.
- The importance of Infrastructure as Code (IaC) tools and CI/CD pipelines in ensuring flexible, scalable, and efficient deployment processes is highlighted.
- An image description details a user interface for an evaluation system in LangChain, showcasing features like evaluator status tracking and performance metrics.
- Final takeaways include the necessity of choosing the right tools and infrastructure for deployment, considering trade-offs between requirements, and the dynamic nature of the ML and LLM landscapes.
- The chapter details the deployment of LLM applications using frameworks like FastAPI and Lanarky, highlighting the ease of setting up a web server for conversational AI applications.
- Ray is introduced as a framework for scaling generative AI workloads, with a practical example of building a semantic search engine using LangChain and Ray for efficient indexing and serving.
- Observability in production is emphasized as crucial for maintaining the performance, accuracy, and reliability of LLM applications, with strategies for monitoring key metrics and detecting anomalies.
- A comprehensive list of metrics for monitoring LLM applications is provided, including inference latency, query per second (QPS), token per second (TPS), and user engagement metrics.
- The importance of tracking and tracing in LLM applications is discussed, with LangChain offering functionalities to record the full provenance of responses for auditing and reproducibility.
- Practical steps for implementing a monitoring strategy are outlined, including defining key metrics, setting up logging and alerting mechanisms, and utilizing tools like LIME and SHAP for model interpretation.
- The chapter concludes with insights into the future of LLM application deployment and monitoring, suggesting the exploration of emerging tools like LangServe for enhanced functionalities.
- The chapter explores the deployment and monitoring of generative AI applications in production, emphasizing the importance of observability tools like LangSmith and PromptWatch.
- LangSmith is highlighted as a comprehensive framework for debugging, testing, evaluating, and monitoring LLM applications, offering features like logging traces and benchmarking model performance.
- PromptWatch is introduced for tracking prompts and responses in LLM applications, providing real-time monitoring and analysis capabilities for debugging and optimization.
- The deployment of LLM applications using FastAPI and Ray is discussed, showcasing practical examples of setting up web servers and semantic search engines.
- Key metrics for monitoring LLM applications in production are outlined, including inference latency, query per second (QPS), and token usage, to ensure performance and reliability.
- The chapter concludes with a summary of the challenges and best practices for deploying generative AI applications, along with questions to test the reader's understanding of the material.
- An invitation to join a community Discord space for further discussion with the authors and other readers is provided, encouraging ongoing learning and collaboration.

## code snippets
```
PairwiseStringEvaluator
CriteriaEvalChain
load_evaluator() function
load_dataset() function
from langchain.evaluation import load_evaluator
evaluator.evaluate_string_pairs()
LangSmith API usage
FastAPI web server setup
ConversationChain and ChatOpenAI from LangChain
Lanarky for deploying LLM applications
Ray for distributed training and serving
LangChain and Ray for semantic search engine
Monitoring and evaluation tools in LangChain
PromptWatch for tracking prompts and responses
LangSmith for monitoring and evaluating LLM applications
FastAPI for deploying web servers
Ray for scaling generative AI workloads
```
