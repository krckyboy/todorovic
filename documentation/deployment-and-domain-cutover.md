# Deployment and Domain Cutover

## Purpose

Define a safe deployment path to Vercel and controlled cutover to the production domain.

## Vercel Project Setup

1. Import this GitHub repository into Vercel.
2. Set the production branch to `main`.
3. Confirm build command and output:
   - build: `npm run build`
   - output directory: `dist`
4. Configure required environment variables:
   - `PUBLIC_GA_MEASUREMENT_ID` (default target: `G-5BEM5384PJ`)

## Domain Mapping Strategy (`todorovic.dev` + `www`)

Recommended:

- Keep `todorovic.dev` as the canonical primary domain.
- Redirect `www.todorovic.dev` to `todorovic.dev`.

Implementation:

1. Add both domains in the Vercel project domain settings.
2. Apply DNS records exactly as shown by Vercel for this project.
3. Verify TLS/HTTPS is active for both hostnames.
4. Confirm redirect behavior (`www` -> apex) after propagation.

## Controlled Cutover Checklist

Pre-cutover:

- `npm run lint` passes
- `npm run build` passes
- Key routes smoke-checked in preview deployment:
  - `/`
  - `/about`
  - `/skills`
  - `/blog`
  - at least two blog post routes
- GA4 script and metadata tags verified in built output

Cutover:

1. Capture current production DNS and deployment state for rollback reference.
2. Point domain to the new Vercel project using Vercel-provided DNS records.
3. Monitor DNS propagation and HTTPS status.
4. Run post-cutover smoke checks on the production domain.
5. Create GA4 launch annotation/release note with timestamp and commit SHA.

Rollback:

1. Re-apply previous DNS configuration from the pre-cutover snapshot.
2. Confirm old site serves correctly over HTTPS.
3. Record rollback reason and follow-up actions in OpenSpec change notes.
