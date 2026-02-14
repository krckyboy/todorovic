## 1. Canonical Avatar Asset

- [x] 1.1 Ensure canonical author image exists at `public/images/dusan.png`
- [x] 1.2 Remove duplicate/legacy avatar paths in `public/` that are no longer canonical
- [x] 1.3 Verify `AuthorCard.astro` default `avatarSrc` points to `/images/dusan.png`

## 2. Author Avatar Fallback Behavior

- [x] 2.1 Update `src/modules/blog/components/AuthorCard.astro` to gracefully fall back when avatar load fails
- [x] 2.2 Ensure fallback alt text remains meaningful for accessibility
- [x] 2.3 Verify missing-avatar scenarios do not render broken image UI

## 3. Profile Defaults Consistency

- [x] 3.1 Audit profile defaults (name/title/avatar) across Hero, BlogHeader/AuthorCard surfaces
- [x] 3.2 Align inconsistent defaults that affect public presentation

## 4. Verification

- [x] 4.1 Run `npm run build` and verify no build errors
- [x] 4.2 Run `npm run lint` and verify no linting errors
