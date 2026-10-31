---
type: skill
skill: roblox-weapon-yoke-carry
---

# Weapon Yoke Carry

## Goal

While equipped, the weapon lies horizontally across the back of the shoulders behind the neck and centred on the spine. Both hands grip the shaft near their own side, arms raised with elbows out. Legs retain normal walking/running animation. Unequip restores the normal pose and removes the carry attachment.

## Inspect before code

Read StarterPack and ReplicatedStorage. In a spawned Play character, report the Humanoid RigType, target Tool, Handle size/orientation, actual long axis, RequiresHandle value, and existing Tool scripts/animations. Do not infer R6/R15 or the long axis from its name.

## Attachment

Keep all work inside the Tool. Disable the default grip by setting RequiresHandle false or by safely removing the auto-created RightGrip during equipped flow. On the server, make WeaponCarry as a Motor6D from Torso on R6 or UpperTorso on R15 to Handle. Start from these local torso offsets and tune from screenshots:

| Rig | C0 position |
|---|---|
| R6 | 0, 0.6, 0.7 |
| R15 | 0, 0.5, 0.6 |

In torso space, positive Z is behind the body. Rotate only after checking Handle's actual long axis: Z-long commonly needs Y plus 90 degrees; Y-long commonly needs Z plus 90 degrees. These are starting orientations, not facts. On unequip, destroy WeaponCarry and restore any modified state.

## Arm pose

Prefer a published Action-priority looped animation containing only arms/hands. Stop it on unequip; legs then keep their locomotion tracks. Build the pose with both arms raised, elbows bent outward, hands at the shaft; tune with screenshots. If an uploaded animation is impossible, use a client pose for responsiveness and a server-visible counterpart or server joint offsets for other players. Never claim client-only Motor6D.Transform is automatically replicated.

## Acceptance test

In Play, take rear-above and side screenshots. Confirm weapon horizontal, behind neck, centred, not clipping head/back; both hands contact the shaft; legs animate while walking; and unequip removes the weld/pose. Adjust position/orientation/angles and repeat until all pass. Report the changed instances, scripts, offsets, rotations, animation ID if any, and final screenshots.

