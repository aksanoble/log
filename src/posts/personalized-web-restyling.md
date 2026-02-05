---
title: "What If Every Website Looked How I Wanted?"
date: 2026-02-02
type: log
summary: "Started skin-deep - a Chrome extension that uses AI to transform website layouts. Realized CSS injection isn't enough; you need DOM transformation."
cardClass: "feed-item bg-sand"
layout: layouts/post.njk
tags: [post, log, chrome-extension, ai, css, dom-manipulation]
---

I spend a lot of time on websites with terrible typography. Cluttered layouts. Aggressive ads. Dark patterns everywhere.

What if I could just... change them?

Started building **skin-deep** - a Chrome extension for AI-powered website restyling. The idea: tell an AI "make this look like a minimal blog" or "give this a dark brutalist aesthetic" and have it transform the page in real-time.

First attempt: capture the page DOM, send it to DeepSeek via OpenRouter, get back CSS, inject it into the page.

It kind of worked. Backgrounds changed. Fonts shifted. But the fundamental layout remained. A cluttered sidebar is still a cluttered sidebar, even with nicer fonts.

The insight: **CSS injection isn't enough**. What I actually want is DOM transformation - restructuring the page, not just restyling it. Hide the sidebar. Move the content. Remove the cruft.

New mental model: `f(tree) → tree`. The AI doesn't just suggest styles - it writes a transformation function that takes the current DOM tree and produces a new one.

This is harder. Way harder. But it's the actual problem.

The personalized web. Every site, exactly how you want it. Still a fantasy, but now I know what the real challenge is.
