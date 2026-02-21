## ADDED Requirements

### Requirement: Tooling assessment is documented with evidence

The project SHALL maintain a documented assessment of blog authoring tools based on primary-source capabilities and constraints.

#### Scenario: Tooling matrix is present

- **WHEN** reviewing the blog authoring workflow documentation
- **THEN** each recommended tool includes supported use cases and limitations
- **AND** recommendations are tied to specific authoring phases

### Requirement: Agent role model is defined

The authoring workflow SHALL define explicit agent roles and handoffs.

#### Scenario: Research and technical review responsibilities are separated

- **WHEN** a non-trivial blog post is authored
- **THEN** the workflow assigns distinct responsibilities for research, technical accuracy review, and editorial refinement
- **AND** the handoff criteria between roles are documented

### Requirement: OpenSpec integration for non-trivial content work

Non-trivial blog content updates SHALL map to an OpenSpec workflow path.

#### Scenario: Schema and command guidance is explicit

- **WHEN** an author starts a non-trivial blog change
- **THEN** the workflow specifies which OpenSpec schema/commands to use
- **AND** required artifacts and validation gates are listed
