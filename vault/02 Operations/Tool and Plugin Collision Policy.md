---
type: policy
topic: tools
---

# Tool and Plugin Collision Policy

## Keep

| Tool | Why it stays | Boundary |
|---|---|---|
| Agent HQ | Existing role queue, gate system, memory, approvals | It is the only orchestrator for HQ tasks. |
| Official Roblox Studio MCP | Already configured in Agent HQ and built into Studio | Target one Studio ID; never add a community duplicate. |
| Ponytail | Existing code-minimality guard | It reduces implementation scope, not test scope. |
| Caveman | Existing concise-response rule | It reduces prose only. |
| LihFolk V2 knowledge router | Read-on-demand Roblox research and code-check hook | Install only after review; use as evidence, not as an architect. |
| Existing roblox-vfx skill plus VFX Forge | User-selected VFX authoring stack | VFX Forge is the runtime authority. |

## Integrate conditionally

- LihFolk V2: keep its vault search, trust labels, quality scoring, data/security/performance skills, and optional code-check hook. Do not merge its 22 skills into this vault or copy its notes/assets. Its plugin stays separately installed and referenced by path.
- LihFolk VFX: research and visual-review guidance may be consulted, but do not import LihFolkVFX as a second runtime while VFX Forge and EmitModule are selected.
- Blender: use for original/licensed props and headless reproducible model generation. Do not use it to bypass asset licences.
- Open Cloud: keep credentials owner-only and outside notes, prompts, logs, screenshots, and source control. Upload only with explicit owner authorization.

## Do not add

- A second Roblox Studio MCP.
- A second VFX runtime or an EmitModule replacement.
- A generic “all agents” orchestrator alongside an active HQ job.
- Automatic asset downloads or the 1.3 GB LihFolk asset pack while free space is low.
- Plugins that overlap with an enabled authoritative plugin without a written reason.

## Current local observations

- Node 24.15.0, npm 11.12.1, and npx 11.12.1 are present.
- The Agent HQ project already registers Roblox_Studio through the official Windows MCP launcher and agent-hq through its local server.
- VFX.rbxmx supplied by the owner is VFX Forge 1.4.5, but it is not in the local Roblox Plugins folder; that folder currently has MCPBridge.lua only.
- The global Claude skill directory has no roblox-vfx folder yet. Do not install it or the VFX plugin without owner approval and a source check.
- Global Claude configuration has Ponytail and Caveman enabled. They are complementary under their own documentation, so leave both in place.

