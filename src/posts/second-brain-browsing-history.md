---
title: "Building a Second Brain from Browsing History"
date: 2026-01-30
type: log
summary: "Started entt-agent - a Chrome extension that tracks browsing history and extracts entities to build a personal knowledge graph. Think personal Wikipedia, built automatically."
cardClass: "feed-item large bg-sky"
layout: layouts/post.njk
tags: [post, log, knowledge-graph, ner, chrome-extension, terminusdb]
---

What if everything I read online automatically became part of a personal knowledge base? Every article, every documentation page, every random Wikipedia rabbit hole - all connected, all searchable, all mine.

That's the idea behind **entt-agent**. A system to build my own "second brain" from browsing activity.

The architecture: a Chrome extension captures URLs and page content as I browse. The content gets sent to a Python backend running [NuNER_Zero](https://huggingface.co/numind/NuNER_Zero) for entity extraction. The entities and their relationships get stored in [TerminusDB](https://terminusdb.com/) - a graph database I'm running on my home server via Coolify.

Sounds straightforward. It wasn't.

First, I downloaded the wrong model. There's a `NuNER_Zero` and there's... other things with similar names. The HuggingFace downloads kept failing halfway through. Turns out you need to use `huggingface-cli` directly for reliable downloads. Who designs these things?

Then GLiNer (the library NuNER uses) decided it didn't like my Python version. Or was it scipy? Something about Fortran compilers. I don't want to talk about it.

But eventually - entities. Real entities extracted from real web pages, sitting in a graph database, waiting to be connected.

The vision: a personal Wikipedia that builds itself. We'll see if it gets there.
