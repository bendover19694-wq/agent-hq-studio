---
name: roblox-game-gate
description: The default quality gate for all Roblox game coding. Use on ANY request that writes or changes a Roblox game (Luau, UI, systems, assets, Studio, Rojo). Search the vault first, build, then check every section, every asset and every standard before calling the work done.
---

# Roblox game gate

Every Roblox coding request goes through this. Scale it to the change: a one-line fix runs the steps it can affect; a UI, system or money change runs all of them. Say which steps you skipped and why.

The project's own CLAUDE.md wins on any conflict. It holds the hard rules, the coworker rules and the exact commands.

## 1. Before coding

1. Read the project's CLAUDE.md and the doc for the system you are changing.
2. Search the vault: use the `lihfolk:lihfolk` skill, or `python -I "C:/Users/YOU/Documents/LihFolk-V2/LihFolk Vault V2/_tools/vault.py" "<task>"`. Read the note's Common mistakes and Checklist for anything touching data, money, remotes or live players. Cite the notes you used.
3. Pick the matching skill from the table below and follow it.
4. Name the sections and files you will touch, and state which device sizes they affect.

| Area | Skill |
|---|---|
| Any screen, HUD or menu | `lihfolk:roblox-ui-builder` |
| Tutorial, first session | `lihfolk:lihfolk-tutorial` |
| Remotes | `lihfolk:roblox-secure-remotes` |
| Saves | `lihfolk:roblox-datastore-safety` |
| Purchases | `lihfolk:roblox-monetization-compliance` |
| Exploits | `lihfolk:roblox-anti-exploit-review` |
| Lag, memory, phones | `lihfolk:roblox-performance-audit` |
| Bugs | `lihfolk:roblox-debugging` |
| Maps, worlds | `lihfolk:lihfolk-worldbuilding` |
| Models, assets | `lihfolk:roblox-asset-import`, `lihfolk:lihfolk-assets` |

## 2. Standards every section must meet

**Layout, on desktop and a phone simulator**
- Text at 12 px or larger on screen. Tap targets 44 px or larger, or a stable invisible pad.
- Nothing clipped, no text overflow, no overlaps. An open panel must not cover the navigation.
- Check real screen size: the Roblox top bar takes height from a phone, so measure the live scale.
- Toasts, coins and effects never sit on top of a popup.

**Clarity**
- One main action per screen. A new player knows what to press in 3 seconds.
- Goal labels say what they measure.

**First session**
- First action within 20 seconds of control, first reward within 60 seconds.
- Objective text is 8 words or fewer. One verb, one goal, one pointer.
- No shop offers or count badges until the tutorial ends.
- The core loop completes at least once. Funnel events are logged.

**Loading screen**
- The bar shows real steps, never a timer that creeps to 90%.
- A hard timeout exists. Skip only shows when it works. Returning players go straight in.

**Server and money**
- The server owns all value. Each remote is validated, rate-limited and size-limited.
- One `ProcessReceipt`, idempotent. Grant, save, then return `PurchaseGranted`.
- No paid random items, paid power or paid luck. Shop copy is neutral and the shop never auto-opens.
- Saves use session locks, retries and a `BindToClose` that waits for running saves.

**Assets**
- Every asset id loads. Every art key and sound name the code asks for exists.
- Never paste an id you have not verified. Nothing copied from other games.

**Accessibility and performance**
- Reduced motion works, and state never relies on colour alone.
- Gamepad can reach every control, if the game supports it.
- No per-frame UI rebuilds. Loops pause when closed.

## 3. Checks

Tools are in `tools/` beside this file. If the project has no `scripts/probes/`, copy them in: `studio_mcp.py` and `ui_click.py` to `scripts/`, the rest to `scripts/probes/`. Then write `scripts/probes/sections.json` listing every screen as `{"name", "steps", "leave"}`, where steps are clicks by visible text or instance name.

Static, always:
```bash
stylua src tests
```
```bash
selene src
```
```bash
lune run tests/run
```
```bash
sh C:/Users/YOU/Documents/LihFolk-V2/hooks/scripts/lihfolk-check.sh --scan src
```

In Studio, private test place only, Play stopped before each sync:
1. Run the first-session playtest. Add `AUDIT=1` to audit every step.
2. `python -u scripts/probes/sections.py <studio_id> <label>` walks every screen, saves screenshots and reports layout findings and script errors.
3. `python scripts/probes/assetaudit.py <studio_id>` checks that every asset loads.
4. Repeat 1 and 2 with `StudioDeviceSimulatorService:SetDeviceAsync("iphone_14")`, then `StopSimulationAsync()`.
5. Run the project's beta and fuzz probes if it has them.

**Look at the screenshots.** Audits miss overlaps and ugly layouts. Read at least the map, each changed screen and one popup, on both devices.

**A miss is a finding, not noise.** When a click fails, find out why before rerunning. Check where the input landed with `GetGuiObjectsAtPosition`. A click can hit a label behind a popup, or a real game bug can look like a flaky test.

## 4. Independent review

For UI or system changes, score with `skills/quality-score/rubrics/<type>.md` in the LihFolk folder. The minimum is 8.5 and hard gates must pass. A reviewer that did not make the work does the scoring: spawn an agent with the screenshot folder and the rubric. Tell it what it cannot see, such as invisible tap pads, and verify its findings before acting.

## 5. Report

State, with numbers: each check and its result, what was not run and why, the review score, and what is still wrong. Update the docs and decision log in the same change. Exit code 0 alone is not proof.

Never publish, spend Robux, push or merge unless the owner asks. Never edit a live place.
