---
title: "Visualizing the Knowledge Graph"
date: 2026-02-01
type: log
summary: "Built a React frontend with ReactFlow to visualize the knowledge graph. Also debated whether a 'visit' should be an entity or a relationship."
cardClass: "feed-item bg-olive"
layout: layouts/post.njk
tags: [post, log, react, reactflow, terminusdb, knowledge-graph, visualization]
---

A knowledge graph isn't very useful if you can't see it.

Spent the day building a React frontend for entt-agent. [ReactFlow](https://reactflow.dev/) handles the graph visualization - nodes for entities, edges for relationships. A panel on the left lists entity types. Click an entity, see its connections. Search for something, find it in the graph.

The interesting debate was about data modeling.

When I visit a URL, what should that look like in the graph? Is the visit itself an entity? Or is it a relationship between me and the URL?

Option A: **URL** is an entity, **Visit** is an entity, they're connected by some relationship.

Option B: **URL** is an entity, **Visit** is a relationship with a timestamp property.

I went with Option B. A visit isn't really a "thing" - it's an event, a connection between a person and a place at a point in time. This way I can query "all sites I visited on January 15th" without creating thousands of visit-entities cluttering the graph.

Also fixed a bug on [kanthi.io](https://kanthi.io) - images weren't loading on production due to broken paths. The kind of bug that makes you wonder how it ever worked in the first place.
