# Roblox AI Studio operating rules

@01\ System/Master\ Prompt.md
@01\ System/Platform\ Modes\ and\ Task\ Routing.md
@02\ Operations/Tool\ and\ Plugin\ Collision\ Policy.md
@02\ Operations/Capability\ and\ Storage\ Preflight.md

For a specialised task, invoke the matching skill before acting:

- Agent HQ queue or multi-role work: roblox-agent-hq
- Existing VFX Forge work: roblox-vfx-forge
- Map, level, or environment work: roblox-map-building
- Reference image to Roblox-ready prop: roblox-reference-prop
- Weapon yoke carry pose: roblox-weapon-yoke-carry
- Game notes, decisions, or postmortems: roblox-project-memory
- Low disk space or a requested storage audit: roblox-storage-preflight

Use the current game project's local instructions first when they are more specific. Do not turn a research note into code without checking the target project, the selected Studio session, and the acceptance criteria.

