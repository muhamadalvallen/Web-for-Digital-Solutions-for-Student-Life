

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

If an instruction conflicts with `PLAN.md`, follow `PLAN.md` unless the user explicitly decides otherwise.

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

Do not introduce authentication, cloud synchronization, external calendar integrations, or paid AI APIs unless explicitly requested.

## 4. Technical Guidelines

- Use the existing Next.js App Router setup.
- Use TypeScript.
- Use Tailwind CSS for styling.
- Prefer reusable, modular React components.
- Use clear and consistent naming.
- Keep business logic separate from UI components when practical.
- Use client components only when browser APIs, state, effects, or interactions require them.
- Handle `localStorage` safely because it is unavailable during server rendering.
- Avoid unnecessary dependencies.
- Do not install packages without a clear reason.

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

Make changes consistent with the existing project structure. Do not restructure the entire application without a clear reason.

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
3. Identify dependencies and possible conflicts.
4. Explain the implementation approach briefly when working with the user.
5. Implement only the requested scope.
6. Test the changes and check for TypeScript or lint errors.

Do not overwrite existing working features without a reason.

Do not silently change project architecture or dependencies.

## 8. Git and Team Collaboration

This project is developed collaboratively through GitHub.

- Keep changes focused on the assigned feature.
- Avoid modifying files owned by other contributors.
- Do not commit directly to `main` unless explicitly instructed.
- Use feature branches and Pull Requests.
- Coordinate changes to shared files.
- Never commit API keys, passwords, tokens, or `.env.local`.

## 9. Working with the Project Owner

The project owner is still learning web development.

Therefore:

- Explain important technical decisions in understandable language.
- Prefer step-by-step implementation.
- Avoid making many unrelated changes at once.
- Explain which files are being created or modified.
- Do not assume the owner understands unfamiliar commands.
- Ask before making major architectural decisions.
- Do not claim a feature works without testing it.

**Important:** The goal is to build a maintainable, functional academic companion, not merely a visually impressive prototype.
