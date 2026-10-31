---
type: skill
skill: roblox-storage-preflight
---

# Storage Preflight

Run before a large asset download/import, Blender render batch, vault backup, archive, or duplicate export.

1. Read the available free space and identify the planned operation's rough size.
2. If space is below the operation's safe margin, perform a read-only candidate audit limited to likely locations.
3. Report exact candidates, sizes, activity/last-modified signals, purpose, recovery option, and risks. Do not inspect secret contents.
4. Ask for approval of a numbered cleanup list. Do not delete, uninstall, modify settings, or move a project without a matching approved item.
5. After an approved cleanup, report recovered space and verify that the relevant tool/project still opens.

This is a consent gate, not a licence to clean the computer broadly.

