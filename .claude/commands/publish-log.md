# Publish Log

Publish a daily log post from Claude history.

Usage: /publish-log <date>
- date: YYYY-MM-DD, "today", or "yesterday"

## Instructions

1. Run the script to extract activity:
```bash
node /Users/medha/projects/kanthi-blog/scripts/publish-log.js $ARGUMENTS
```

2. Read the output and create a blog post based on the activity context.

3. Follow the writing style guide in `/Users/medha/projects/kanthi-blog/agents.md`:
   - Conversational, first-person narrative
   - Start with a scene or observation
   - Use rhetorical questions
   - Short paragraphs (2-4 sentences max)
   - Personal anecdotes about what worked and what didn't
   - Link to tools, repos, people mentioned
   - End with reflection or next steps

4. Create a `.md` file in `/Users/medha/projects/kanthi-blog/src/posts/` with:
   - A catchy title (NO "Log:" prefix)
   - ~155 char SEO summary
   - Appropriate tags based on topics
   - The color specified in the script output
   - Story-format content (not bullet points)

5. Build and verify:
```bash
cd /Users/medha/projects/kanthi-blog && npm run build
```

6. Report the new post URL to the user.

## Example

For `/publish-log 2026-01-30`, create something like:

```markdown
---
title: "Building a Second Brain from Browsing History"
date: 2026-01-30
type: log
summary: "Started entt-agent - a Chrome extension that tracks browsing history and extracts entities to build a personal knowledge graph."
cardClass: "feed-item bg-sky"
layout: layouts/post.njk
tags: [post, log, knowledge-graph, chrome-extension]
---

What if everything I read online automatically became part of a personal knowledge base?

That's the idea behind **entt-agent**...
```
