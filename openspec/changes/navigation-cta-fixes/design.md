## Context

The portfolio has 4 main pages (Home, About, Skills, Blog) connected only through the top navigation bar. About and Skills pages have no cross-links despite describing the same person. The About page's contact CTA is plain text pointing to the footer. The Hero section drives traffic to About and Skills but not to blog content. The 404 page has a single "Go Home" button. AuthorCard.astro uses a different title ("JavaScript Developer | Team Leader") than the Hero ("Frontend Team Lead").

## Goals / Non-Goals

**Goals:**

- Make the contact CTA on About page actionable (styled button, direct mailto link)
- Create bidirectional links between About and Skills pages
- Unify the professional title across all components
- Add breadcrumbs for wayfinding on About and Skills pages
- Add blog discovery path from the Hero section
- Help 404 visitors recover by suggesting relevant pages

**Non-Goals:**

- Contact form (a mailto link is sufficient for now)
- Dedicated contact page
- Changing the navigation bar structure
- Adding new pages

## Decisions

**1. CTA links to mailto instead of a contact page**
Rationale: A mailto link provides immediate action with zero new infrastructure. A contact page would require form handling, spam protection, and a backend service — all overkill for a personal portfolio.

**2. Breadcrumbs as inline markup in each page rather than a shared component**
Rationale: Only 2 pages need breadcrumbs (About, Skills). A shared component adds abstraction for minimal reuse. If more pages need breadcrumbs later, extract then.

**3. Hero blog CTA links to /blog rather than a specific latest post**
Rationale: Linking to a specific post URL requires querying content collections in the Hero component, coupling it to blog data. Linking to /blog is simpler and always stays current since the blog index shows latest posts first.

## Risks / Trade-offs

- **[Risk]** mailto links can feel outdated → Acceptable for a developer portfolio; the audience (recruiters, developers) expects and uses email
- **[Risk]** Inline breadcrumbs duplicated across pages → Only 2 instances; extract to a component if a third page needs them
