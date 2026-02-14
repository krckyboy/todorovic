# Proposal: Setup Deployment

> **STATUS: BACKLOG** as of February 14, 2026.

## Problem

Need to deploy the site to production.

## Goals

1. Automated deployment on git push
2. Preview deployments for branches/PRs
3. Fast global CDN
4. Easy configuration

## Options

| Platform         | Pros                            | Cons            |
| ---------------- | ------------------------------- | --------------- |
| Vercel           | Best DX, fast, free tier        | Vendor lock-in  |
| Netlify          | Good DX, forms, functions       | Slightly slower |
| Cloudflare Pages | Fastest CDN, generous free tier | Fewer features  |

## Recommended: Vercel

- Best Next.js/Astro support
- Automatic preview deployments
- Easy custom domain setup
- Good analytics

## Scope

- Create Vercel project
- Connect GitHub repo
- Configure build settings
- Setup custom domain (todorovic.dev)
- Configure redirects if needed

## Tasks

1. [ ] Create Vercel account (if needed)
2. [ ] Import GitHub repo to Vercel
3. [ ] Verify build works
4. [ ] Configure custom domain
5. [ ] Setup DNS records
6. [ ] Verify HTTPS works
7. [ ] Test production build
