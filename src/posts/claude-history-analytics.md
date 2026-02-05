---
title: "Claude History Analytics"
date: 2026-01-28
type: log
summary: "Built scripts to analyze Claude Code conversation history and track daily prompt activity patterns."
cardClass: "feed-item bg-mustard"
layout: layouts/post.njk
tags: [post, log, claude, analytics]
---

I've been using Claude Code for a few months now. Every conversation, every prompt, every rabbit hole - it's all logged somewhere in `~/.claude/history.jsonl`. Thousands of interactions. A record of how I think when I have an AI assistant at my fingertips.

The question hit me: what patterns are hiding in there?

So I wrote a quick script to parse the history and count prompts per day. Nothing fancy - just enough to see when I'm most active, what kinds of tasks I delegate, how my usage has evolved.

The answer? I'm apparently a late-night prompter. Who knew.

Moved the scripts to `projects/learn` for safekeeping. Might build something more interesting on top of this later - maybe a personal dashboard of AI-assisted productivity. Or maybe it'll just sit there. Either way, it's nice to know the data is there, waiting.
