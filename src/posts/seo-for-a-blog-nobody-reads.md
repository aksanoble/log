---
title: "SEO for a Blog Nobody Reads"
date: 2026-02-04
type: log
summary: "Added structured data, Open Graph tags, sitemaps, and RSS feeds to kanthi.io. Because even a blog with zero readers deserves proper SEO."
cardClass: "feed-item bg-mustard"
layout: layouts/post.njk
tags: [post, log, seo, eleventy, blogging]
---

What's the point of SEO on a blog that maybe three people read?

Honestly? It's the same reason you make your bed even when nobody's coming over. You do it because it's the right way to build things.

I spent the evening auditing [kanthi.io](https://kanthi.io) for SEO basics. The kind of stuff that should've been there from day one - `og:title`, `og:description`, `og:image`, Twitter card meta, JSON-LD structured data, a proper sitemap, an RSS feed. All the invisible scaffolding that tells search engines and social platforms "hey, this is a real website."

The fun part was making it automatic. Every new post now gets all of this for free through the Eleventy base layout. Write the front matter - title, summary, maybe an image - and the template handles the rest. No more forgetting to add a meta description.

Wrote the rules down in `agents.md` too, so that future-me (or Claude) won't skip these steps when publishing a new post.

Is any of this going to suddenly drive traffic? Probably not. But the next time someone shares a post link, it'll actually show a proper card instead of a blank preview. And that feels like progress.
