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

### Requirement: Blog workflow enforces three-role finalization

The blog-authoring workflow SHALL enforce a three-role sequence for finalization: writer, technical verifier, and editorial reviewer.

#### Scenario: Technical and editorial passes run after writing

- **WHEN** writing is completed in the revision stage
- **THEN** a technical review artifact is created to verify commands, claims, and implementation details
- **AND** an editorial review artifact is created afterward to ensure readability and audience fit
- **AND** final approval does not occur until both review stages are completed

### Requirement: Dedicated role skills are available for writer and review stages

The repository SHALL provide dedicated blog-authoring role skills/agents for writer, technical review, and editorial review, plus a router skill that orchestrates the sequence.

#### Scenario: Contributors can run role-specific execution

- **WHEN** role-specific execution is needed
- **THEN** dedicated skills exist for writer, technical review, and editorial review
- **AND** each skill references the blog-authoring schema as source of truth

#### Scenario: Router skill enforces role ordering

- **WHEN** the top-level blog-authoring skill is used
- **THEN** it routes execution through writer -> technical review -> editorial review
- **AND** it does not treat the workflow as complete before review roles finish

### Requirement: One-command blog kickoff orchestration is available

The repository SHALL provide a `new-blog` skill/agent that supports `/new-blog <change-id-or-slug>` style kickoff and routes through required OpenSpec stages.

#### Scenario: New blog kickoff triggers required stages

- **WHEN** `/new-blog <change-id>` style input is used
- **THEN** OpenSpec blog-authoring change setup is initiated
- **AND** writer -> technical review -> editorial review stages are executed
- **AND** final readiness output includes validation status

### Requirement: Unused legacy schemas are removed from active project workflows

The repository SHALL avoid maintaining unused project-local schemas that duplicate or supersede active workflows.

#### Scenario: Deprecated schemas are removed after consolidation

- **WHEN** `blog-authoring` is adopted as the canonical blog workflow schema
- **THEN** unused project schemas (`astro-page`, `astro-project`, `blog-content`) are removed from `openspec/schemas/`
- **AND** active documentation/config references are updated to canonical schema names

### Requirement: Blog writing style remains practical, plain-language, and team-oriented

The workflow SHALL enforce a practical writing style for developer-facing posts, with simple wording and explicit team-scale framing.

#### Scenario: Tone and wording are aligned for non-native readers

- **WHEN** draft/revision artifacts are produced
- **THEN** wording is plain and down-to-earth (no buzzword-heavy phrasing)
- **AND** examples are concrete and easy to scan
- **AND** robotic or overly abstract wording is replaced with simple alternatives

#### Scenario: OpenSpec basics posts include selective section summaries

- **WHEN** a post contains long conceptual sections
- **THEN** those sections include short blockquote summaries (`TL;DR`) where useful
- **AND** blockquote summaries are not overused on short or snippet-only sections

#### Scenario: Basics posts explicitly defer advanced setups

- **WHEN** the post scope is OpenSpec basics
- **THEN** advanced content (custom schemas, strict verification layers, larger multi-team flows) is deferred
- **AND** the ending includes a clear note that advanced examples will be covered in a follow-up post

#### Scenario: Structure starts with AI value, then team drift, then OpenSpec

- **WHEN** a post introduces OpenSpec workflow
- **THEN** it first acknowledges AI productivity gains
- **AND** it shows drift/misalignment risks in team workflows without specs
- **AND** it introduces OpenSpec as the process layer that restores alignment and traceability

#### Scenario: Examples are formatted for readability and low ambiguity

- **WHEN** command examples include extra context
- **THEN** terminal commands and Markdown context snippets are shown in separate blocks
- **AND** snippet labels are concise and do not include unnecessary prefixes
- **AND** external links open in a new tab with safe rel attributes
