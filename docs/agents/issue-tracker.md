# Issue Tracker: GitHub

Issues and specs for this repository live as GitHub issues on [adamwondale/agriculture-erp](https://github.com/adamwondale/agriculture-erp). Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --comments`, filtering comments by `jq` and fetching labels.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

## Pull Requests as a Triage Surface

**PRs as a request surface: no.**

## Wayfinding & Ticket Operations

Used by `/to-tickets`, `/to-spec`, and `/wayfinder`:
- Create GitHub issues for feature tickets.
- Use issue dependencies and task lists to sequence multi-phase execution.
