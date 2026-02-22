---
title: 'Welcome: Why I Rebuilt todorovic.dev'
description: 'A short launch note on moving from a heavier Next.js and Strapi setup to Astro, and how spec-driven development reshaped my AI-assisted workflow.'
pubDate: 2026-02-16
author: 'Dušan Todorović'
tags: ['launch', 'astro', 'openspec', 'ai-assisted-engineering']
draft: true
---

## Why This Rebuild Happened

I wanted this website to reflect how I work today, not how I worked a few years ago.

At [Constructor Tech](https://constructor.tech), we recently started using spec-driven development on a large UI-kit library scope, and it has worked really well for us. It changed how I think about AI, especially how much preparation should happen before code generation starts.

I will write a dedicated post on spec-driven development soon, but the short version is simple: clearer intent before implementation gives better outcomes with AI in the loop. In the meantime, take a look at [OpenSpec](https://github.com/Fission-AI/OpenSpec) if you are curious.

I wanted to test the same mindset on a side project in my free time, so this website rewrite became the perfect place to start.

## Why I Moved Away from the Previous Stack

The previous version used Next.js with Strapi, PostgreSQL, and Docker. I built it a few years ago, before AI became part of my daily workflow, and honestly, it was fun to build.

It was not really about the stack evolving. I just did not feel like using a complex system and logging into Strapi for every update when I can simply rely on Git and markdown.

So this became a needed flow change. It also turned into a great test for AI capabilities: with specs as clear intent, I can guide AI through the work instead of letting it drive the direction.

## Why Astro Fits Better

Astro gives me a straightforward content workflow, clean markdown authoring, and a structure that is easy to reason about.

It is also AI-friendly in a practical way: if I want help with grammar, clarity, or idea framing, I can do that directly in markdown without forcing content through a complex CMS layer.

## My Take on AI in Writing

It is no secret that AI is entering every part of software workflows. I use it, and I find it useful.

But I also think people overuse it, to the point where trust drops. I notice that most on LinkedIn.

My rule is simple: AI can support the writing process, but it should not write posts on its own. The point is to amplify your thinking, not replace it.

## What You Can Expect Here

I will keep sharing practical posts about:

- front-end engineering and architecture
- spec-driven delivery and implementation workflows
- AI-assisted engineering with clear guardrails
- leadership and career lessons from real project experience

Thanks for reading, and welcome to the new version of the site.
