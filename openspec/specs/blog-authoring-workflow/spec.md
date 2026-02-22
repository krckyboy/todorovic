# blog-authoring-workflow Specification

## Purpose

Define a practical, human-first blog authoring workflow in OpenSpec that keeps intent and research explicit while treating canonical blog markdown files as the writing source of truth.

## Requirements

### Requirement: Structured blog authoring artifacts include intent, inspiration, and research

The repository SHALL provide a blog authoring schema that captures post intent, ideation output, and claim-oriented research before final revision.

#### Scenario: New schema exposes inspiration and research stages

- **WHEN** a change is created with the `blog-authoring` schema
- **THEN** artifact stages include explicit inspiration and research outputs
- **AND** research output is not merged into generic writing notes

### Requirement: Research artifact provides claim-to-source mapping

The research stage SHALL define claim verification expectations with source traceability.

#### Scenario: Research output includes confidence and unknowns

- **WHEN** research artifact is produced
- **THEN** it includes claim-to-source mapping, confidence notes, and open unknowns
- **AND** it flags time-sensitive claims requiring recency checks

### Requirement: Canonical blog content file supports both create and edit workflows

The workflow SHALL treat `src/content/blog/<slug>.md` as the canonical source for writing in both new-post and edit modes.

#### Scenario: Existing post is revised through canonical content file

- **WHEN** the input is an existing post markdown file
- **THEN** writing and edits are applied directly to the canonical blog content file
- **AND** artifact outputs remain intent/research/revision documentation

### Requirement: Revision artifact enforces quality gates and publish checks

The final stage SHALL include repository validation commands and publish-readiness checks.

#### Scenario: Revision output includes required validation gates

- **WHEN** revision artifact is completed
- **THEN** it references `npm run lint` and `npm run build`
- **AND** it includes manual checks for metadata quality, tags, and rendering paths

### Requirement: Unused legacy schemas are removed from active project workflows

The repository SHALL avoid maintaining unused project-local schemas that duplicate or supersede active workflows.

#### Scenario: Deprecated schemas are removed after consolidation

- **WHEN** `blog-authoring` is adopted as the canonical blog workflow schema
- **THEN** unused project schemas (`astro-page`, `astro-project`, `blog-content`) are removed from `openspec/schemas/`
- **AND** active documentation/config references are updated to canonical schema names
