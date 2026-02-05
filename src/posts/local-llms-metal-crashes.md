---
title: "Local LLMs, METAL Crashes, and the Cloud Fallback"
date: 2026-01-31
type: log
summary: "Tried running LLMs locally with MLX on Apple Silicon. Learned that local inference is promising but fragile. Ended up using OpenRouter as a fallback."
cardClass: "feed-item large bg-orange"
layout: layouts/post.njk
tags: [post, log, lightrag, mlx, local-llm, deepseek, knowledge-graph]
---

The entity extraction in entt-agent was working, but I wanted better. Enter [LightRAG](https://github.com/HKUDS/LightRAG) - a library that does graph-based RAG with automatic entity and relationship discovery. Exactly what I needed.

One problem: it needs an LLM to work.

The romantic in me wanted everything local. My data, my models, my hardware. So I went down the MLX rabbit hole.

[MLX](https://github.com/ml-explore/mlx) is Apple's framework for running ML models on Apple Silicon. I installed `mlx-lm`, downloaded **Qwen2.5-Coder-14B-Instruct-4bit** (9GB of quantized weights), and prepared for local AI magic.

The first few prompts worked beautifully. Then:

```
libc++abi: terminating due to uncaught exception of type
std::runtime_error: [METAL] Command buffer execution failed
```

METAL buffer crashes. The GPU ran out of memory, or something. I tried smaller context windows. I tried different models. I tried DeepSeek R1 distilled variants. Same story - works until it doesn't.

The pragmatist in me gave up and set up [OpenRouter](https://openrouter.ai/). DeepSeek-R1T2-Chimera via API. Reliable, fast, not running on my laptop.

The lesson: local LLMs on Apple Silicon are *almost* there. The sweet spot might be local embeddings (small, fast, no API calls) plus cloud LLM for generation (reliable, scalable). Hybrid approach. Not as pure, but it actually works.

Sometimes "actually works" beats "philosophically correct."
