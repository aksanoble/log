---
title: "When the Extension Won't Talk to the Backend"
date: 2026-02-03
type: log
summary: "A late-night debugging session with entt-agent. Tailscale wouldn't connect, the React app showed no data, and I learned how my Chrome extension actually works."
cardClass: "feed-item bg-orange"
layout: layouts/post.njk
tags: [post, log, debugging, tailscale, chrome-extension, entt-agent]
---

It's past midnight. The React app is showing nothing. No entities, no visits, no data. Just an empty graph mocking my efforts.

The server was supposed to be running on my NUC. Key word: supposed.

First problem: I couldn't even SSH into `medha-nuc`. Tailscale decided this was a good time to forget I existed. The device was there in the dashboard, but connections just... hung. Tried the usual dance - check the status, restart the daemon, stare at the screen hoping for a miracle.

Eventually fell back to the local network. Sometimes the fancy overlay network is just extra complexity you don't need at 1am.

Server started. Added `--autorestart` because I've learned that lesson before. But the React app still showed nothing.

"Check the code bro," I told Claude. (Yes, I talk to my AI assistant like that at 1am.)

Turns out I had a fundamental misunderstanding of my own architecture. The Chrome extension doesn't just log visits for later - it writes directly to the backend in real-time. Every page I visit, every entity extracted, goes straight to TerminusDB as it happens.

Which means... if the server was down all evening, there's nothing to show. The extension wasn't queuing data. It was just silently failing.

Something to fix: local storage fallback when the backend is unreachable. But not tonight.
