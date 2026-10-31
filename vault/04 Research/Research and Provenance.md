---
type: research
reviewed: 2026-10-30
---

# Research and Provenance

## Local evidence inspected

- The supplied Agent HQ shortcut resolves to the local Roblox Project worktree. Its decision record defines a 16-role dashboard with review gates, per-role memory, a Claude desktop app lane for code/docs/testing, and an Antigravity lane for UI concept/store art.
- Its configuration points Roblox_Studio to the official Windows Studio MCP launcher, not an unpinned community server.
- The supplied VFX.rbxmx is a Model named VFX with VFX Forge 1.4.5 version metadata. Its source includes VFX-DL text, an Emit Module import action, ReplicatedStorage.EmitModule generation, and shared.vfx runtime assignment.
- The owner-supplied VFX bootstrap was converted into a skill with its critical safety gates retained: confirm target place, obtain modification authorization, inspect actual APIs, test in Play, clean temporary content, and do not patch VFX Forge or EmitModule.
- The supplied game-development transcript informed the reference-first, mobile-first, one-feature, screenshot, decisions, and system-note rules.

## External sources consulted

- Roblox confirms that Studio MCP is built into Studio, supports a selected Studio instance through studio_id, and can read/edit/test open places. This is the supported connector to keep.
- Anthropic confirms that CLAUDE.md/AGENTS.md provide project instructions, skills are local instruction bundles, and a plugin can bundle skills, agents, hooks, and MCP components.
- LihFolk V2 publishes a 22-skill Claude Code plugin, a searchable 1,300-plus-note vault, trust labels, quality scoring, and a post-edit Luau check hook. Its licence governs the vault/code and separately restricts asset redistribution.
- The supplied Obsidian repositories were reviewed for roles, not blindly installed: Dataview is the metadata/query core; Omnisearch is human retrieval; Folder Notes is navigation; Local Backup is retention-controlled backup; Callout Manager/Columns/Editing Toolbar/Iconize are optional UX; Style Settings is now redirected to a community archive.

## Integration decision

Use Agent HQ as the dispatcher, existing Claude Code/Desktop as execution, Antigravity as visual ideation, official Studio MCP as the Studio bridge, LihFolk as a separately installed knowledge and quality layer, and VFX Forge as the sole selected VFX runtime. This avoids the two high-risk collisions: competing orchestration and competing VFX frameworks.

