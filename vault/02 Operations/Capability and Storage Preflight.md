---
type: procedure
topic: storage
status: required-before-large-work
---

# Capability and Storage Preflight

## Current baseline — 2026-10-30

| Check | Observed |
|---|---|
| C: free space | 33.4 GB after cleanup, re-read before large work |
| Node | 24.15.0 |
| npm / npx | 11.12.1 |
| Agent HQ | installed locally and configured |
| Roblox Studio MCP config | present in Agent HQ project |
| VFX Forge 1.4.5 source file | supplied in Downloads, not installed |
| roblox-vfx skill | not found in the global Claude skills directory |

## When to run

Run this before downloading asset packs, importing models or textures, archiving a vault, creating Blender previews, installing a large plugin, or duplicating project files.

## Read-only audit

1. Read free space on the target drive.
2. List candidate locations only: Downloads, known temporary folders, old asset-pack archives, duplicate installers, previous local vault backups, old project exports, and AI cache folders.
3. For each candidate, report exact path, size, last modified date, whether it looks active, and a recovery route.
4. Never inspect or report secret contents. Never list credentials, keys, browser profiles, token files, or personal document content.
5. Do not scan the whole PC recursively unless the owner asks; start with likely locations.

## Approval gate

Present a numbered reclaim plan. Every line must include a precise target and expected GB/MB recovered. Wait for the owner to approve the selected numbers. Approved cleanup should be recoverable where practical: recycle bin, archive move, or an explicit backup destination.

## Hard exclusions

Never clean:

- an open Studio place, a live project, or the only copy of a project;
- .agent-hq tokens, owner tokens, databases, or active task logs;
- .claude credentials, settings, current sessions, or a plugin whose ownership is unknown;
- VFX Forge, EmitModule, or a game asset before its project references are checked;
- a file because it is merely old, large, or named “temp.”

## Space policy

Below 15 GB free: do not start a large download or asset pack install. Below 8 GB: stop non-essential generation and ask the owner for a cleanup decision. Store automatic Obsidian backups outside C: when possible, cap their retention, and exclude large asset folders from routine text-vault backups.

