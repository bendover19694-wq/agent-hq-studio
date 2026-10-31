---
name: roblox-weapon-yoke-carry
description: Use for a Roblox Tool held horizontally across the shoulders behind the neck with both hands gripping it.
---

# Weapon yoke carry

Use the complete procedure in ../../../03 Skills/Weapon Yoke Carry.md relative to this skill directory when it is accessible. Inspect the actual rig, Handle dimensions/long axis, RequiresHandle, and existing scripts/animations before editing.

Keep changes inside the Tool. Attach a server-visible WeaponCarry Motor6D from Torso or UpperTorso to Handle; orient it only after checking the real long axis. Prefer an Action-priority looped arms-only animation so legs retain locomotion. Do not rely on a client-only Motor6D.Transform to replicate.

In Play, verify rear-above and side screenshots, hand contact, no neck/back clipping, walking legs, and clean unequip restoration. Report final tunable offsets, rotations, animation information, instances/scripts touched, and evidence.

