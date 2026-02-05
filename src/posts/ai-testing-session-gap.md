---
title: "The Gap Between 'AI Can Click' and 'AI Can Test'"
date: 2026-01-29
type: log
summary: "Researched AI-powered browser automation. Turns out teaching an AI to click buttons is easy. Teaching it to test your authenticated app is hard."
cardClass: "feed-item bg-lavender"
layout: layouts/post.njk
tags: [post, log, testing, automation, playwright]
---

I want an AI that can test my web apps. Not just click buttons in a demo - actually log in, navigate around, verify that things work. Sounds reasonable, right?

Cloned [testzeus-hercules](https://github.com/test-zeus-ai/testzeus-hercules) to see how others are approaching this. Poked around Playwright agent skills for Claude. The demos look impressive.

Then I tried to test something behind 2FA.

Here's what happens: the AI agent spins up a fresh browser instance. I log in manually. The agent does its thing. Then it needs to do something else and... spins up another fresh browser instance. Login state gone. Back to square one.

I tried connecting to existing Chrome debug sessions. Looked into Playwright MCP integration. Even attempted to persist browser state between runs. Each approach had its own special way of not quite working.

The gap between "AI can click buttons" and "AI can test my authenticated app" is significant. Session management, state persistence, dealing with 2FA - these are the boring problems that make the difference between a cool demo and something actually useful.

Still exploring. The promise is real, even if the path isn't clear yet.
