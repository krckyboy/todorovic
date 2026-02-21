## 1. OpenSpec Artifacts

- [x] 1.1 Write proposal for `optimize-social-share-metadata`
- [x] 1.2 Write technical design document for implementation choices
- [x] 1.3 Create capability spec at `specs/social-share-metadata/spec.md`
- [x] 1.4 Update `openspec/specs/open-proposals/spec.md` with the new active change

## 2. Metadata and Asset Implementation

- [x] 2.1 Update default OG generator script to export 1200x630 compressed JPEG without CTA text
- [x] 2.2 Update fallback social image path from `/og-default.png` to `/og-default.jpg`
- [x] 2.3 Add OG/Twitter image metadata enhancements (alt + dimensions)
- [x] 2.4 Update homepage title/description and base fallback description lengths
- [x] 2.5 Align blog OG generator visual style while keeping blog-only CTA and removing motif overlap

## 3. Generate and Validate Assets

- [x] 3.1 Regenerate fallback image at `public/og-default.jpg`
- [x] 3.2 Verify fallback image dimensions and file size thresholds
- [x] 3.3 Confirm social metadata output includes required tags and accessibility-oriented alt text
- [x] 3.4 Regenerate and inspect blog OG images for bottom CTA placement and motif removal

## 4. Verification

- [x] 4.1 Run `npm run lint`
- [x] 4.2 Run `npm run build`
- [x] 4.3 Perform manual share-preview check for homepage metadata and blog CTA placement (local visual + generated HTML metadata inspection)
