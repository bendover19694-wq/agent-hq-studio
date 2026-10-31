---
type: skill
skill: roblox-vfx-forge
runtime: VFX Forge 1.4.5
---

# Roblox VFX Forge

## Selected pipeline

Windows -> Node/npm/npx -> Claude Code -> roblox-vfx knowledge skill -> official Roblox Studio MCP -> selected Roblox Studio place -> VFX Forge 1.4.5 -> place-specific EmitModule -> ReplicatedStorage.EmitModule -> actual shared.vfx runtime -> VFX development and Play verification.

## Mandatory opening

1. Ask which Roblox Studio place is the target when any ambiguity exists. Identify its Studio MCP session explicitly.
2. Ask for modification authorization before changing that place.
3. Audit only what matters: Node, npm, npx, Claude Code, roblox-vfx skill, Studio/MCP connection, VFX Forge, EmitModule, and shared.vfx.
4. Read the actual VFX Forge/runtime structure; never invent a shared.vfx method or recreate EmitModule from memory.

## Fixed decisions

- VFX Forge 1.4.5 is the only VFX plugin/runtime for this project.
- Never patch, alter, or replace VFX.rbxmx.
- Never recreate, optimise, rename, or hand-write VFX Forge's EmitModule.
- Never use an alternate VFX system merely because it is available.
- If VFX-DL acceptance is shown, the owner must accept it personally.
- Camera movement, FOV punch, shake, flash, and temporary post effects are local. Server logic validates gameplay and sends compact event data; clients render.

## Quality and test gate

Inspect existing effects first. Build an effect with a readable silhouette, controlled timing, appropriate layers, a clean end state, and budgets appropriate to its platform. Test it in Play, inspect the actual visual result, check console warnings/errors, stop Play, remove temporary test objects/scripts/effects, and confirm no leftovers before reporting.

Do not equate “code ran” with a finished VFX. If a result is technically correct but noisy, weak, poorly timed, or expensive, iterate and re-test.

