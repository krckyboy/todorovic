## ADDED Requirements

### Requirement: Blog authoring templates enforce plain, human language

The blog-authoring schema and templates SHALL instruct authors and agents to use clear, down-to-earth language and concrete examples instead of abstract or robotic phrasing.

#### Scenario: Inspiration prompt asks for practical, natural writing

- **WHEN** the inspiration artifact is generated
- **THEN** guidance explicitly requests natural, conversational wording
- **AND** it discourages buzzwords and overly formal language

#### Scenario: Revision prompt includes a plain-language quality pass

- **WHEN** the revision artifact is completed
- **THEN** editorial checks include simplification of overly technical or artificial wording
- **AND** examples are verified as practical and understandable to the intended audience

### Requirement: Blog authoring workflow enforces three-role review sequence

The blog-authoring schema SHALL include explicit technical and editorial review stages after writing, so final approval passes through role-based checks.

#### Scenario: Technical review follows revision stage

- **WHEN** the writer pass is completed in revision
- **THEN** technical review artifact guidance validates commands, claims, and implementation detail accuracy
- **AND** lint/build checks are part of the technical verification stage

#### Scenario: Editorial review follows technical review stage

- **WHEN** technical review is completed
- **THEN** editorial review artifact guidance validates clarity, tone, and non-native readability
- **AND** final approval is gated on completion of both review artifacts

### Requirement: Dedicated role skills are available for writer and review stages

The repository SHALL expose dedicated blog authoring skills/agents for writer, technical review, and editorial review roles, plus a router that orchestrates them.

#### Scenario: Role skills can be invoked independently

- **WHEN** a contributor needs writer-only or review-only execution
- **THEN** dedicated role skills exist for each role
- **AND** each role references the blog-authoring schema as source of truth

#### Scenario: Router skill orchestrates role sequence

- **WHEN** the top-level blog-authoring skill is invoked
- **THEN** it routes execution through writer -> technical review -> editorial review
- **AND** it does not treat final approval as complete until review roles are done

### Requirement: One-command blog kickoff orchestration is available

The repository SHALL expose a `new-blog` skill/agent that accepts `/new-blog <change-id-or-slug>` style input and routes through OpenSpec blog-authoring workflow plus required role stages.

#### Scenario: New blog kickoff follows OpenSpec sequence

- **WHEN** `/new-blog <change-id>` style input is used
- **THEN** the workflow starts via OpenSpec blog-authoring change setup
- **AND** it executes writer -> technical review -> editorial review sequence
- **AND** final readiness output includes validation status
