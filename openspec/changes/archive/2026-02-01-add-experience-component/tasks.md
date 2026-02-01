# Tasks: add-experience-component

## Implementation Checklist

- [ ] Create `src/components/Experience.tsx`
  - React component with useState for active company
  - Embed experience data array
  - Company tab list
  - Position details with date formatting
  - Utility functions: formatDuration, convertToString

- [ ] Create `src/components/Experience.module.css`
  - `.list` - horizontal tab bar, flex layout
  - `.list li` - tab styling with hover/active states
  - `.content` - content container with background
  - `.item` - hidden by default, visible when active
  - `.position` - position card styling
  - `.title` - position title (medium weight)
  - `.duration`, `.location` - muted text styling
  - `.listContent` - bullet list for achievements

## Verification

- [ ] `npm run build` passes
- [ ] Company tabs switch correctly
- [ ] Date ranges display correctly
- [ ] Duration calculates properly (years, months)
- [ ] Multiple positions per company work
- [ ] Works with `client:load` directive
