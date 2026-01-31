# Spec: Verification Agents

> **STATUS: DRAFT** - Not for implementation in this project

## ADDED Requirements

### Requirement: Build verification

The verify-build agent SHALL validate that the project builds successfully.

#### Scenario: Build passes
- **WHEN** `npm run build` succeeds
- **THEN** returns status="pass"

#### Scenario: Build fails
- **WHEN** `npm run build` fails
- **THEN** returns status="fail" with error output and suggestions

#### Scenario: Build warnings
- **WHEN** build succeeds with warnings
- **THEN** returns status="warn" with warning details

---

### Requirement: Accessibility verification

The verify-a11y agent SHALL check for accessibility issues.

#### Scenario: Semantic HTML check
- **WHEN** analyzing component HTML
- **THEN** verifies proper heading hierarchy, landmark usage

#### Scenario: ARIA validation
- **WHEN** ARIA attributes present
- **THEN** validates correct usage and required properties

#### Scenario: Focus state check
- **WHEN** interactive elements present
- **THEN** verifies :focus-visible styles exist

#### Scenario: Issues found
- **WHEN** accessibility issues detected
- **THEN** returns list with severity, element, and fix suggestion

---

### Requirement: SEO verification

The verify-seo agent SHALL check for SEO best practices.

#### Scenario: Meta tags check
- **WHEN** analyzing page
- **THEN** verifies title, description, og:* tags present

#### Scenario: Heading structure
- **WHEN** analyzing page
- **THEN** verifies single h1, logical heading order

#### Scenario: Image alt text
- **WHEN** images present
- **THEN** verifies alt attributes exist and are descriptive

#### Scenario: Issues found
- **WHEN** SEO issues detected
- **THEN** returns list with recommendation and priority

---

### Requirement: Verification pipeline

The verification agents SHALL run as a pipeline after task completion.

#### Scenario: Sequential then parallel
- **WHEN** verification pipeline starts
- **THEN** runs verify-build first (blocking)
- **AND** if passes, runs verify-a11y and verify-seo in parallel

#### Scenario: Build blocks others
- **WHEN** verify-build fails
- **THEN** skips verify-a11y and verify-seo

---

### Requirement: Result aggregation

The orchestrator SHALL aggregate verification results.

#### Scenario: All pass
- **WHEN** all verifiers return pass
- **THEN** reports "All checks passed" and allows MR push

#### Scenario: Blocking failure
- **WHEN** verify-build fails
- **THEN** blocks MR push, requires fix

#### Scenario: Non-blocking warnings
- **WHEN** verify-a11y or verify-seo return warnings
- **THEN** reports warnings but allows MR push
