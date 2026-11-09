## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

# Digital Solutions for Student Life — Agent Instructions

## 1. Project Context

You are working on **Digital Solutions for Student Life**, a personal academic companion web application.

Before making any changes:

- Read `PLAN.md` at the project root.
- Understand the product vision, MVP scope, modules, and technical decisions.
- Read the relevant Next.js documentation in `node_modules/next/dist/docs/` before using Next.js APIs or conventions.
- Follow the installed Next.js version. Do not assume older Next.js conventions are still valid.

If an instruction conflicts with `PLAN.md`, follow `PLAN.md` unless the team explicitly decides otherwise.

## 2. Product Vision

The application helps students manage four aspects of academic life:

1. **Study Buddy** — AI learning companion with Socratic guidance and direct explanation modes.
2. **Dream Tracker** — Personal goals, milestones, and progress tracking.
3. **Focus Mode** — Pomodoro timer and Deep Work sessions.
4. **Academic Calendar** — Class schedules, assignments, exams, and personal agendas.

The application should feel like one integrated product, not four disconnected tools.

Core experience:

**Understand → Plan → Execute**

The Dashboard is the central entry point.

## 3. MVP Priorities

Prioritize functional MVP features:

- Dashboard overview and upcoming agenda.
- Study Buddy interface with two learning modes.
- Create, read, update, and delete goals and milestones.
- Pomodoro and Deep Work timer.
- Create, read, update, and delete academic events.
- Persistent local data using `localStorage`.

Do not implement future features prematurely.

Do not introduce authentication, cloud synchronization, external calendar integrations, or paid AI APIs unless explicitly requested or agreed by the team.

## 4. Technical Guidelines

- Use the existing Next.js App Router setup.
- Use TypeScript.
- Use Tailwind CSS 4 conventions already configured in the project.
- Prefer reusable, modular React components.
- Use clear and consistent naming.
- Keep business logic separate from UI components when practical.
- Use client components only when browser APIs, state, effects, or interactions require them.
- Handle `localStorage` safely because it is unavailable during server rendering.
- Avoid unnecessary dependencies.
- Do not install packages without a clear reason; discuss dependencies that affect the shared project with the team.

## 5. Architecture and Code Quality

Organize code by feature and responsibility.

Keep these concerns separate:

- Shared UI components.
- Feature-specific components.
- Data types and interfaces.
- Storage and persistence logic.
- Utility functions.
- Application layouts and pages.

Avoid:

- Giant components containing unrelated features.
- Duplicated logic.
- Hardcoded data scattered throughout components.
- Unnecessary abstractions.
- Overengineering the MVP.

Make changes consistent with the existing project structure. Do not restructure the entire application without a clear reason and team discussion.

## 6. UI/UX Guidelines

The application should feel:

- Modern and clean.
- Minimal but functional.
- Consistent across all modules.
- Easy to understand for university students.
- Responsive on desktop and mobile.

Pay attention to:

- Visual hierarchy.
- Spacing and alignment.
- Typography.
- Consistent colors and components.
- Empty states, loading states, and error states.
- Accessibility and usability.

Do not create decorative interfaces that lack functional behavior.

## 7. Development Workflow

Before implementing a feature:

1. Read the relevant requirements in `PLAN.md`.
2. Inspect existing files and components.
3. Identify dependencies and possible conflicts with ongoing work.
4. Briefly explain the implementation approach when working with a team member.
5. Implement the requested or team-agreed scope.
6. Test the changes and check for TypeScript or lint errors.
7. Summarize what changed, which files were affected, and what checks were run.

Do not overwrite existing working features without a reason.

Do not silently change project architecture or shared dependencies. Discuss significant changes with the team first.

## 8. Collaborative Development Principles

This is a collaborative student project. All team members have equal ownership, responsibility, and opportunities to contribute.

There is no permanent hierarchy between Project Lead, Developers, or other team roles. Every member may:

- Propose ideas and improvements.
- Discuss and contribute to technical decisions.
- Implement features and fix bugs.
- Review and improve other members' code.
- Contribute to documentation and project planning.

Tasks may be divided based on interest, availability, or expertise. Task assignments are for coordination only and do not create a hierarchy.

### Decision-making

- Routine implementation decisions can be made independently within an agreed task scope.
- Major architectural changes, shared dependencies, and changes affecting multiple modules should be discussed with the team before implementation.
- Communicate potential conflicts before changing shared files or work that another member may currently be editing.
- Document important technical decisions so everyone can understand the reasoning.
- No single member has exclusive authority over project decisions.

### Git and GitHub workflow

- `main` is the primary stable branch.
- Use feature branches for new features, improvements, and bug fixes.
- Use Pull Requests (PRs) to make changes visible to the team before merging.
- Review each other's code constructively and address important feedback.
- Any team member may create or review a PR. Merging should follow the team's agreed review practice; it does not require permission from a particular designated person.
- Avoid pushing unfinished or untested changes directly to `main`.
- Keep changes focused and explain their purpose in the PR description.
- Never commit API keys, passwords, tokens, or `.env.local`.

Suggested branch naming:

- `feature/feature-name`
- `fix/bug-name`
- `docs/documentation-name`

Suggested commit conventions:

- `feat:` for new features.
- `fix:` for bug fixes.
- `docs:` for documentation changes.
- `style:` for formatting and UI styling changes.
- `refactor:` for code restructuring.
- `chore:` for maintenance and configuration.

### Working with shared files

- Inspect the existing implementation before modifying shared files.
- Coordinate when a change may affect another member's ongoing work.
- Avoid editing the same files simultaneously without communication.
- Keep components, naming conventions, types, and UI patterns consistent.
- Prefer reusable components and shared utilities when appropriate.
- Do not introduce unnecessary dependencies or duplicate existing functionality.

## 9. AI Collaboration Guidelines

When assisting with this project, AI tools must:

- Treat all team members as equal contributors; do not assume one person has exclusive authority.
- Do not require approval from a specific person before implementing a task that the team has already agreed on.
- Follow `PLAN.md`, this file, and the team's documented decisions.
- Read relevant local Next.js documentation in `node_modules/next/dist/docs/` before implementing features that depend on Next.js APIs or conventions.
- Inspect existing code before modifying it.
- Avoid unrelated changes and unnecessary refactoring.
- Explain important technical decisions in clear, beginner-friendly language.
- Prefer step-by-step guidance when a team member is learning or asks for a tutorial.
- Explain which files are being created or modified.
- Ask the team before making major architectural changes that have not been discussed.
- Never claim that code works without running appropriate checks; state clearly when checks could not be run.

AI tools should support the team's understanding and collaboration, not replace communication between members.

## 10. Team Principles

The team follows these principles:

1. **Equal Ownership:** Every member has an equal stake in the project's success.
2. **Open Communication:** Share ideas, concerns, and technical decisions with the team.
3. **Mutual Respect:** Respect different opinions and review feedback constructively.
4. **Shared Responsibility:** Everyone contributes to code quality, documentation, and project progress.
5. **Continuous Learning:** The project is an opportunity for every member to develop technical skills.
6. **Transparency:** Keep changes, progress, and important decisions visible to the team.

The goal is to build, learn, review, and improve the application together.

**Important:** The goal is to build a maintainable, functional academic companion, not merely a visually impressive prototype.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
