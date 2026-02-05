#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const HISTORY_FILE = path.join(process.env.HOME, '.claude/history.jsonl');
const POSTS_DIR = path.join(__dirname, '../src/posts');
const COLORS = ['bg-sage', 'bg-orange', 'bg-mustard', 'bg-lavender', 'bg-sky', 'bg-olive', 'bg-sand', 'bg-red'];
const EXCLUDED_PROJECTS = ['korrai-map-ui', 'service-stac', 'korr-agent', 'urbansar-tools', 'trail-zurich-report-orchestrator'];

function parseDate(dateStr) {
  // Accept YYYY-MM-DD or "yesterday" or "today"
  if (dateStr === 'today') {
    return new Date().toISOString().split('T')[0];
  }
  if (dateStr === 'yesterday') {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  }
  return dateStr;
}

function getHistoryForDate(targetDate) {
  const lines = fs.readFileSync(HISTORY_FILE, 'utf-8').split('\n').filter(Boolean);
  const entries = [];

  for (const line of lines) {
    try {
      const entry = JSON.parse(line);
      const ts = entry.timestamp;
      const dt = new Date(ts);
      const dateStr = dt.toISOString().split('T')[0];

      if (dateStr === targetDate) {
        const project = entry.project || '';
        const projectName = project.split('/').pop();

        // Filter out korr-related projects
        if (!EXCLUDED_PROJECTS.some(exc => projectName.includes(exc) || project.includes('/korr/'))) {
          entries.push({
            time: dt.toTimeString().slice(0, 5),
            project: projectName,
            prompt: entry.display || ''
          });
        }
      }
    } catch (e) {
      // Skip invalid lines
    }
  }

  return entries;
}

function groupByProject(entries) {
  const grouped = {};
  for (const entry of entries) {
    const proj = entry.project || 'misc';
    if (!grouped[proj]) grouped[proj] = [];
    grouped[proj].push(entry);
  }
  return grouped;
}

function generateSlug(entries, date) {
  // Try to derive a meaningful slug from the most common project or first significant prompt
  const grouped = groupByProject(entries);
  const projects = Object.keys(grouped).filter(p => p !== 'misc' && p !== 'projects' && p !== 'medha');

  if (projects.length > 0) {
    // Use the project with most entries
    const mainProject = projects.sort((a, b) => grouped[b].length - grouped[a].length)[0];
    return mainProject.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  }

  // Fallback to date-based slug
  return `log-${date}`;
}

function generatePromptContext(entries, date) {
  const grouped = groupByProject(entries);

  let context = `Date: ${date}\n\n`;
  context += `Activity summary (non-work projects only):\n\n`;

  for (const [project, projectEntries] of Object.entries(grouped)) {
    context += `## ${project}\n`;
    for (const entry of projectEntries) {
      context += `- [${entry.time}] ${entry.prompt}\n`;
    }
    context += '\n';
  }

  return context;
}

function pickColor(date) {
  // Deterministic color based on date
  const hash = date.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return COLORS[hash % COLORS.length];
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// Main
const dateArg = process.argv[2];
if (!dateArg) {
  console.error('Usage: node publish-log.js <date>');
  console.error('  date: YYYY-MM-DD, "today", or "yesterday"');
  process.exit(1);
}

const targetDate = parseDate(dateArg);
const entries = getHistoryForDate(targetDate);

if (entries.length === 0) {
  console.error(`No non-work activity found for ${targetDate}`);
  process.exit(1);
}

const context = generatePromptContext(entries, targetDate);
const slug = generateSlug(entries, targetDate);
const color = pickColor(targetDate);
const formattedDate = formatDate(targetDate);

// Output the context and instructions for Claude
console.log('=== ACTIVITY CONTEXT ===');
console.log(context);
console.log('=== END CONTEXT ===\n');

console.log('=== INSTRUCTIONS FOR CLAUDE ===');
console.log(`
Based on the activity above, create a blog post for ${formattedDate}.

Follow the writing style from agents.md:
- Conversational, first-person narrative
- Start with a scene or observation
- Use rhetorical questions
- Short paragraphs
- Personal anecdotes about what worked and what didn't
- End with reflection or next steps

Create the file: ${POSTS_DIR}/${slug}.md

Use this front matter:
---
title: "[Generate a catchy title - NO 'Log:' prefix]"
date: ${targetDate}
type: log
summary: "[Generate ~155 char SEO summary]"
cardClass: "feed-item ${color}"
layout: layouts/post.njk
tags: [post, log, ...relevant tags]
---

Then write the story content in markdown.

After creating the file, run: cd /Users/medha/projects/kanthi-blog && npm run build
`);
