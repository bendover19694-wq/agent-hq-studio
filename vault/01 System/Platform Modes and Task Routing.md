---
type: policy
topic: routing
---

# Platform Modes and Task Routing

## The actual Agent HQ setup

The desktop shortcut points to the Agent HQ project at:

    <your game repo>

It starts a local dashboard at 127.0.0.1:4317. Agent HQ already has an app lane for Claude desktop/code roles and an Antigravity lane for Concept designer and Thumbnail artist. Its Studio config uses the official Windows Studio MCP command. Preserve this design rather than adding a second task board, Studio connector, or always-on worker.

## Route table

| Task | Owner | Working lane | Required evidence |
|---|---|---|---|
| New feature across systems | Lead, Architect, Builder, reviewer/playtester | Agent HQ + Claude Code | plan, tests, review gates |
| UI look/reference | Concept designer | Antigravity | concept, approved tokens/reference |
| UI implementation | UI role | Claude Code + Studio | phone/PC screenshots |
| Map or world | World builder | Claude Code + Studio | traversal screenshots and playtest |
| 3D prop | Builder/librarian | Claude Code + Blender + Studio | side comparison and import check |
| VFX | Builder with VFX scope | Claude Code + VFX Forge + Studio | runtime, Play screenshots, cleanup |
| Research/market | Scout | Agent HQ read-only | sources and assumptions |
| Storage diagnosis | Owner-approved direct task | Claude Code read-only audit | candidate list and recovery path |

## Claude.ai versus Claude Code

Claude.ai is useful for reviewing uploaded notes, drafting a task, and holding project instructions. It is not the execution environment for local Agent HQ or Roblox Studio. Claude Code/Desktop is the execution environment because it can read the local repository, use skills, run the existing Agent HQ MCP, and target a selected Studio session.

## Task prompt template

Use this when making an HQ task or direct task:

Outcome:
Reference / system note:
Target project and target Studio place:
Acceptance criteria:
Must not change:
Verification required:
Owner decision already granted:

Leave a field blank only when it genuinely does not apply. Never silently infer a Studio target or permission to change a live place.

