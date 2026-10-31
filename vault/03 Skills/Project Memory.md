---
type: skill
skill: roblox-project-memory
---

# Project Memory

## Rule

Every system has one durable Markdown note. Read it before changing the system. Update it in the same task when the observed reality changes. Link references, decisions, tests, screenshots, defects, and dependent systems.

## Minimum metadata

Use:

    type: system, feature, decision, or postmortem
    status: planned, active, blocked, or shipped
    owner: role or person
    source: owner reference, Roblox docs, measured, rule of thumb, or unverified
    reviewed: date
    next: smallest next action

## What to record

- Purpose and player-facing behaviour.
- Owned files and Studio instances.
- Contracts: remotes, attributes, saved data, animation markers, asset IDs, and dependencies.
- Constraints and deliberate decisions. Lock a decision once made unless the owner changes it.
- Visual reference analysis and links to screenshots.
- Tests actually run, observed results, known defects, and recovery/rollback notes.
- One reusable lesson when a mistake cost time, such as an interaction between TextWrapped and TextScaled.

Do not write a diary. Keep facts, decisions, observed behaviour, and next actions easy to retrieve.

