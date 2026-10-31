---
type: hub
status: active
purpose: Roblox AI studio operating system
---

# Roblox AI Studio Vault

## Operating principle

AI is the build team; the owner is the creative director and approval gate. Every task begins with the relevant reference, project note, and acceptance criteria. Every meaningful result is visually or mechanically verified before it is reported as done.

## Daily flow

1. Open Agent HQ for a multi-role or queue-based task. Use a direct Claude Code session for a small, contained change.
2. Give one outcome at a time, with a reference image or linked note when visual fidelity matters.
3. Let the correct lane work: Antigravity designs; Claude implements/tests; Studio MCP verifies a specifically chosen place.
4. Review the result, screenshots, test output, and decision note. Only then approve the next task.

## Main controls

- [[01 System/Master Prompt|Master Prompt]]
- [[01 System/Platform Modes and Task Routing|Platform Modes and Task Routing]]
- [[02 Operations/Tool and Plugin Collision Policy|Tool and Plugin Collision Policy]]
- [[02 Operations/Capability and Storage Preflight|Capability and Storage Preflight]]
- [[02 Operations/Obsidian Setup|Obsidian Setup]]
- [[03 Skills/Agent HQ Orchestrator|Agent HQ Orchestrator]]
- [[03 Skills/Roblox VFX Forge|Roblox VFX Forge]]
- [[03 Skills/Map Building|Map Building]]
- [[03 Skills/Reference Prop Modelling|Reference Prop Modelling]]
- [[03 Skills/Weapon Yoke Carry|Weapon Yoke Carry]]
- [[03 Skills/Project Memory|Project Memory]]
- [[04 Research/Research and Provenance|Research and Provenance]]

## Project dashboard

The block below works after Dataview is installed. It is optional; the vault remains usable as plain Markdown.

    ~~~dataview
    TABLE status, owner, reviewed, next
    FROM "Projects"
    WHERE type = "system" OR type = "feature" OR type = "decision"
    SORT file.mtime DESC
    ~~~

## Non-negotiables

- Reference before rendering: no visual feature is built from vague imagination when a reference can be supplied.
- One feature per task. Complete, test, document, then move on.
- Mobile-first, then PC and console.
- Server authority, validated remotes, safe data, and owner-approved monetization.
- No unlicensed likenesses, logos, sounds, images, models, or reference art.
- No fake PASS. Screenshots, output, and observed behaviour are evidence.

