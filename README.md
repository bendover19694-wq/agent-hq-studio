# Agent HQ Studio

Agent HQ, the Roblox AI Studio Vault and the Roblox game gate in one folder.

- **`tools/agent-hq/`**: a local control room for a 16-role Claude Code team. It has chat per role, a task board, review gates and a game pipeline. It runs on Node with no packages to install.
- **`vault/`**: an Obsidian vault with the operating rules, the Master Prompt, templates and seven Roblox skills.
- **`gate/`**: the quality gate. Every Roblox coding request goes through a vault search, section, asset and standards checks, and an independent review.

## Setup

You need [Claude Code](https://claude.com/claude-code), [Node 20 or newer](https://nodejs.org), Git, Python 3 and Roblox Studio. Windows is the tested platform.

1. Copy `tools/`, `scripts/` and `.claude/` into your game's repo root. HQ expects to run from there.
2. Start HQ. Double-click `scripts/Agent HQ.bat`, or run:

    ```bash
    node tools/agent-hq/server.mjs
    ```

3. Open http://127.0.0.1:4317. The first run creates `.agent-hq/`, which holds your token and task database. Add `.agent-hq/` to your `.gitignore` and never share it.
4. In your game's `CLAUDE.md`, add one line pointing at the vault, using your own path:

    ```
    @C:/path/to/Agent-HQ-Studio/vault/CLAUDE.md
    ```

5. Open `vault/` in Obsidian with **Open folder as vault**, and read `00 Home.md`.
6. In HQ, give the Lead role one task: read the vault and adopt its rules.

## Add the Roblox gate

1. Copy `gate/roblox-game-gate/` to `~/.claude/skills/`.
2. Copy `gate/roblox-gate.js` to `~/.claude/hooks/`.
3. Add this to `hooks` in `~/.claude/settings.json`:

    ```json
    "UserPromptSubmit": [
      { "hooks": [{ "type": "command", "command": "node \"$HOME/.claude/hooks/roblox-gate.js\"", "timeout": 5 }] }
    ]
    ```

4. Start a new Claude Code session. Roblox coding requests now load the gate.

The gate's probes are in `gate/roblox-game-gate/tools/`. List your own game's screens in `scripts/probes/sections.json`.

## Add LihFolk (recommended)

The gate searches the LihFolk Vault. It is someone else's work, so it isn't copied here. Install it yourself:

1. In Claude Code, type `/plugin`.
2. Choose **Add marketplace**, then **Add from a repository**.
3. Paste `https://github.com/lihfolk-cy/v2-vault` and install **Lihfolk**.

Then replace the `C:/Users/YOU/Documents/LihFolk-V2` paths in the gate with your own clone. Without LihFolk the gate still runs, minus the vault search and code scan.

## Check it works

```bash
cd tools/agent-hq && npm test
```

Run this from your game's repo. In a bare copy of this folder, 4 of the 134 unit tests fail because they look for game files such as `assets/marketing/icon_draft.png`. The other 130 pass.

## Rules that stay on

- Agents never publish, spend Robux, install tools or edit a live place.
- Work happens in a private test place.
- Never commit `.agent-hq/`, tokens or API keys.

## Credits

Built by the owner with Claude Code. `vault/04 Research/Research and Provenance.md` lists the sources. VFX Forge and LihFolk belong to their own authors and aren't included.
