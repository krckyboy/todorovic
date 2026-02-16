## 1. Taxonomy Definition

- [ ] 1.1 Define canonical tag catalog (slug, label, group, description)
- [ ] 1.2 Define authoring constraints (count, naming, when to add new tag)
- [ ] 1.3 Add explicit guidance for event-style tags (for example `launch`)

## 2. Documentation

- [ ] 2.1 Update `documentation/blog-authoring-workflow.md` with tag governance section
- [ ] 2.2 Add examples of good vs poor tag choices

## 3. Filter Scalability Design

- [ ] 3.1 Define UX behavior for many tags (sort, search, show-more threshold)
- [ ] 3.2 Document keyboard and accessibility expectations for expanded filter UI

## 4. Optional Implementation Planning

- [ ] 4.1 Decide whether to add tag metadata service under `src/modules/blog/services/`
- [ ] 4.2 Decide whether unknown tags are lint warnings or blocking failures

## 5. Validation

- [ ] 5.1 Verify `/blog` filtering still works with canonical tags and URL params
- [ ] 5.2 Verify existing posts keep meaningful discoverability
