# AGENTS

## Purpose
Maintain the Eleventy-based blog and keep all content and output in Git.

## Quick commands
- Install deps: `npm install`
- Local build: `npm run build` (outputs to `docs/`)
- Local preview: `npm run serve`

## Project structure
- Source: `src/`
- Posts: `src/posts/`
- Layouts: `src/_includes/layouts/`
- Assets: `src/assets/`
- Output (commit this): `docs/`

## Adding a post
Create a Markdown file in `src/posts/` with front matter like:

```
---
title: "Post title"
date: 2024-10-12
type: note
summary: "Short summary for SEO and social cards (aim for ~155 chars)."
image: "/assets/post-image.jpg"
imageAlt: "Description of the image"
cardClass: "feed-item bg-sage"
layout: layouts/post.njk
tags: [post, note]
---
Content goes here.
```

Notes:
- `type` should be one of: essay, note, bookmark, tutorial, thought, snapshot, status, music.
- `cardClass` controls size/color on the index grid (e.g., `feed-item large bg-blue`).
- For external links, add `external: "https://example.com"` to link the card and archive item.

## SEO (auto-handled)

The base layout automatically generates these for every post:
- `<title>`, `meta description`, `meta author`, `canonical URL`
- Open Graph tags: `og:title`, `og:description`, `og:image`, `og:type`, `og:url`
- Twitter cards: `twitter:card`, `twitter:creator`, `twitter:title`, `twitter:image`
- Article meta: `article:published_time`, `article:modified_time`
- JSON-LD structured data (BlogPosting schema with author info)

**Front matter for SEO:**
| Field | Purpose | Fallback |
|-------|---------|----------|
| `title` | Page title, og:title, headline | Site title |
| `summary` | Meta description, og:description | First 160 chars of content |
| `image` | og:image, twitter:image | `/assets/IMG_9015-01.jpeg` |
| `imageAlt` | og:image:alt | Title |
| `updated` | article:modified_time | `date` |
| `noindex` | Set `true` to add noindex robots tag | `false` |

**Site-wide SEO files (auto-generated):**
- `/sitemap.xml` - XML sitemap for search engines
- `/robots.txt` - Crawler directives
- `/feed.xml` - RSS feed
- `/llms.txt` - AI crawler info
- `/favicon.svg` - Site favicon

## Build rules
- No GitHub Actions. All builds happen locally.
- Commit the generated `docs/` output to publish via GitHub Pages.

## Quick Commands

### Publish a daily log from Claude history
```
/publish-log <date>
```
- `<date>`: YYYY-MM-DD, "today", or "yesterday"
- Extracts non-work activity from Claude history
- Creates a story-format blog post with proper SEO and colors
- Builds the site automatically

## Writing Style Guide

When writing posts for this blog, follow Kanthi's voice and style:

### Tone & Voice
- **Conversational and direct** - Write like you're explaining to a friend over coffee
- **First person** - Use "I", share personal experiences and opinions freely
- **Curious and exploratory** - Frame problems as puzzles worth solving
- **Optimistic but grounded** - Excited about potential, honest about limitations

### Structure
- **Start with a scene or observation** - Ground the reader in something concrete before going abstract
- **Use rhetorical questions** - "What if...?", "Why is it that...?", "Have you noticed...?"
- **Short paragraphs** - 2-4 sentences max. White space is your friend.
- **TLDR boxes for key insights** - Use `<p class="msg msg--highlight">` for callouts
- **End with an invitation** - Ask for thoughts, pose a question, suggest next steps

### Techniques
- **Analogies from everyday life** - School registers, attendance sheets, Excel vs Word
- **Name-drop tools and people** - Link liberally to projects, repos, people mentioned
- **Personal anecdotes** - "Last month I built...", "I've been using X for two years..."
- **Lists for enumeration** - Bullet points for options, numbered lists for steps
- **Code snippets when relevant** - Use backticks for `technical terms`

### What to Avoid
- Corporate speak or marketing language
- Overly formal academic tone
- Explaining obvious things
- Long unbroken walls of text

### Example Opening Patterns

**Scene-setter:**
> "You look up a place on Google Maps. After a couple hours Google casually informs you that the place has an average review of 4..."

**Personal admission:**
> "It's such a relief to start writing when someone has assured you that no one is going to read it."

**Direct observation:**
> "The computer stopped being personal. Most of the apps I use today are in the browser."

**Rhetorical setup:**
> "You remember the attendance registers in the 'Old School'. Everyday teachers would mark attendance..."

### For Log Posts (type: log)

Logs are personal development journals. Write them as mini-stories:
- What problem was I trying to solve?
- What rabbit holes did I go down?
- What actually worked (or didn't)?
- What did I learn?

Keep technical details but wrap them in narrative. Not "Installed X, configured Y" but "After three failed attempts at downloading the model, I discovered you need to use the CLI directly..."
