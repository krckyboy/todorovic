# Proposal: Categories Component

## Problem
Blog posts need filtering by category/tag. Users need a visual way to see available categories and filter the post list.

## Solution
Create a Categories component that displays clickable tag links with active state support for the current filter.

## Scope
- Single Astro component with CSS Module
- No external dependencies
- Static rendering (no client JS needed)

## Migration Source
Porting from krcky-dev-nextjs: `frontend/src/components/categories/`
