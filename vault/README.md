# Roblox AI Studio Vault

This is a working Obsidian vault and Claude Code skill pack for building Roblox games with Agent HQ. It turns the supplied prompts into a single operating system: references first, one feature at a time, visual proof before completion, and durable project memory.

## Start here

1. In Obsidian, choose **Open folder as vault** and select this folder. Read [[00 Home]].
2. In Claude Code, open the game project and put one import in that project's CLAUDE.md:

    @C:/path/to/Agent-HQ-Studio/vault/CLAUDE.md

3. In Agent HQ, give the Lead role this one-time task: “Read the Roblox AI Studio Vault at the path above. Add its task-routing, safety, and evidence rules to future briefs. Do not copy third-party content into the game.”

4. To make the included skills available without copying them into a game, start Claude Code with this vault added as an additional directory, then use /skills to see the names/prefix:

    claude --add-dir C:/path/to/Agent-HQ-Studio/vault

   An interactive session can instead use /add-dir with the same path. Claude Code then loads this vault's .claude/skills directory. Add the vault only once; do not also duplicate its skills into the project unless you intentionally want project-owned copies.

Claude.ai chat alone cannot read local C: paths, run Agent HQ, use Studio MCP, inspect disk space, or install a plugin. Use Claude Code/Desktop for the automated workflow. For chat-only use, create a Claude Project and upload Master Prompt.md plus the needed skill note for the current task.

## What is deliberately not automated

- No plugins, MCP servers, npm packages, Studio plugins, schedules, Open Cloud uploads, Robux purchases, publishing, or disk cleanup are enabled by this vault.
- It never copies, patches, or replaces VFX Forge.
- It never deletes files. The storage workflow audits first and requires an explicit approved cleanup list.
- It does not bundle LihFolk content or assets. It routes to an installed LihFolk V2 copy and preserves its licence.

## What is included

- A multi-tier master prompt for Claude Desktop/Code.
- Real Claude Code skills in .claude/skills.
- Obsidian notes for Agent HQ, VFX Forge, map design, reference-to-prop modelling, the weapon carry pose, project memory, and storage management.
- An evidence-based plugin and collision policy tailored to this PC.

## Keep this vault separate from a game repository

This is the studio handbook. Game-specific decisions, references, screenshots, and system notes belong under a project's own docs or in a dedicated project folder linked from this vault. Do not make a 46 GB asset dump part of the operating vault; assets belong outside the vault and are indexed by path and licence.

