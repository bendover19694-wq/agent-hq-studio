---
name: roblox-vfx-forge
description: Use for Roblox VFX work that must use the existing VFX Forge 1.4.5 and EmitModule pipeline.
---

# Roblox VFX Forge

Use the complete procedure in ../../../03 Skills/Roblox VFX Forge.md relative to this skill directory when it is accessible. Ask for the exact Studio target if it is not explicit, then ask for modification authorization before editing.

Audit Node/npm/npx, Claude Code, roblox-vfx, Studio MCP connection, VFX Forge, ReplicatedStorage.EmitModule, and actual shared.vfx interfaces. Keep VFX Forge 1.4.5 as the sole runtime. Never patch or replace its plugin, recreate/rename/optimise EmitModule, bypass VFX-DL, or invent APIs.

Inspect existing VFX before building. Server validates; clients render one-shot visual effects. Camera effects are local. Test in Play, check visual result/timing/cleanup/console, remove temporary objects, and report only verified changes.

