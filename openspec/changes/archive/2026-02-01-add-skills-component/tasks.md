# Tasks: add-skills-component

## Implementation Checklist

- [ ] Create `src/components/Skills.tsx`
  - React component with useState for active tab
  - Embed techSkillsData and softSkillsData arrays
  - Two sections with tab lists
  - Tab click handlers for switching
  - Proper ARIA attributes

- [ ] Create `src/components/Skills.module.css`
  - `.list` - horizontal tab bar, flex layout
  - `.list li` - tab styling with hover/active states
  - `.content` - content container with background
  - `.item` - hidden by default, visible when active
  - `.listContent` - bullet list for skill items

## Verification

- [ ] `npm run build` passes
- [ ] Tabs switch correctly when clicked
- [ ] First tab active by default in each section
- [ ] Keyboard accessible
- [ ] Works with `client:load` directive
