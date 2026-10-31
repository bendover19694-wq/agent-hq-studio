---
type: skill
skill: roblox-reference-prop
---

# Reference Prop Modelling

## Scope and rights

Use only a reference the owner created or has permission to copy. This method is for a Roblox-ready prop or weapon matching a supplied side reference, not for inventing a “similar” design.

## Workflow

1. Prepare a level side view. Mirror it if required so the long axis is consistent; record source image dimensions.
2. Create source-pixel grids and zoomed crops for each region. Read coordinates from source-pixel labels, never from scaled display coordinates.
3. Trace each distinct part in a structured trace file: outlines, cut-outs, curve points, centres/radii, depth, material grouping, pivot/attachment point, and moving pieces. Use real holes and enough points to preserve curves.
4. Build headlessly in Blender from the trace. Use factory startup and a scripted CPU geometry build; do not solve this workflow by opening the Blender GUI or rendering in EEVEE/Cycles. Join only logical moving groups, preserve pivots, maintain clean UV/material assignments, and keep each Roblox MeshPart under the project triangle budget.
5. Project the permitted reference colour information only where the owner intends. Do not substitute random procedural paint when fidelity is the request.
6. Produce a CPU or Workbench side preview at matching width and stack it against the reference. Fix outline, gaps, thickness, curvature, colours, and moving-piece pivots before presenting. One source image cannot explain top/back faces; trace further views when 3/4 readability matters.
7. Import to a private Studio test place, confirm scale, orientation, collision, attachment position, and mobile readability. Effects such as bloom, particles, smoke, portal animation, and glints belong in-game, not as an excuse for weak geometry.

## Report

Provide source permission status, output paths, piece names/pivots, triangle count per mesh, textures used, screenshots/comparison, import result, and anything the owner must adjust.

