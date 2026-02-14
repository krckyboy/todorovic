# todorovic

Personal Astro portfolio project using OpenSpec for spec-driven development.

## Architecture and Conventions

This repository follows two core conventions:

- **Domain-Driven Design (DDD)-inspired module structure** for complex features under `src/modules/`.
- **Astro conventions** defined in `openspec/specs/astro-conventions/spec.md` for components, pages, styling, and content.

Start here:

- [documentation/README.md](documentation/README.md) - repo-wide engineering documentation
- [documentation/architecture-conventions.md](documentation/architecture-conventions.md) - DDD + Astro conventions summary
- [documentation/engineering-workflow.md](documentation/engineering-workflow.md) - implementation workflow and OpenSpec execution
- [documentation/modules-and-services.md](documentation/modules-and-services.md) - module/service boundary rules
- [documentation/validation-and-quality-gates.md](documentation/validation-and-quality-gates.md) - lint/build gates and release checklist
- [openspec/specs/astro-conventions/spec.md](openspec/specs/astro-conventions/spec.md) - OpenSpec source-of-truth conventions used by AI assistants and engineers
- [AGENTS.md](AGENTS.md) - AI assistant working rules for this repo

## Project Structure

```text
todorovic/
├── documentation/
├── openspec/
├── src/
│   ├── components/
│   ├── content/blog/
│   ├── layouts/
│   ├── modules/
│   ├── pages/
│   └── styles/
└── public/
```

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## OpenSpec Workflow

```bash
/opsx:new      # start a change
/opsx:continue # create next artifact
/opsx:apply    # implement tasks
/opsx:archive  # archive completed change
```
