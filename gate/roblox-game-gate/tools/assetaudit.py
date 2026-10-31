"""Asset audit: every asset id in src must load in a running client, and every art key or sound name the code
asks for must exist. Play mode must be running.

Usage: python scripts/probes/assetaudit.py <studio_id>
"""
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SID = sys.argv[1]
ids = {}  # id -> ("Sound" | "Image", first file that names it)
text = {}
for folder, _, names in os.walk(os.path.join(ROOT, "src")):
    for name in names:
        if name.endswith((".luau", ".lua")):
            path = os.path.join(folder, name)
            with open(path, encoding="utf-8") as f:
                text[os.path.relpath(path, ROOT)] = f.read()

for path, src in text.items():
    sound = "sound" in path.lower()
    for m in re.finditer(r"rbxassetid://(\d+)", src):
        ids.setdefault(m.group(1), ("Sound" if sound else "Image", path))
    if sound:  # sound tables often hold bare numbers
        for m in re.finditer(r"\b(\d{7,18})\b", src):
            ids.setdefault(m.group(1), ("Sound", path))

problems = []
blob = "\n".join(text.values())
art = next((s for p, s in text.items() if os.path.basename(p) == "Art.luau"), None)
if art is not None:
    keys = set(re.findall(r"^\s*(\w+)\s*=", art, re.M))
    for key, _ in sorted({(k, 0) for k in re.findall(r'ArtFx\.image\(\s*"(\w+)"\s*[,)]', blob)}):
        if key not in keys:
            problems.append(f"MISSING ART KEY {key}")
    for key in sorted(re.findall(r'^\s*(\w+)\s*=\s*""', art, re.M)):
        problems.append(f"EMPTY ART ID {key}")
sound_cfg = next((s for p, s in text.items() if p.lower().endswith(os.path.join("config", "sounds.luau"))), None)
if sound_cfg is not None:
    names = set(re.findall(r"^\s*(\w+)\s*=\s*s\(", sound_cfg, re.M))
    for name in sorted(set(re.findall(r'Sounds\.(?:play|press)\(\s*"(\w+)"', blob))):
        if name not in names:
            problems.append(f"MISSING SOUND {name}")

rows = ",".join(f'{{"{i}","{kind}"}}' for i, (kind, _) in ids.items())
code = """
local CP = game:GetService("ContentProvider")
local rows = {%s}
local bad = {}
local list = {}
for _, r in rows do
	local o
	if r[2] == "Sound" then o = Instance.new("Sound"); o.SoundId = "rbxassetid://" .. r[1]
	else o = Instance.new("ImageLabel"); o.Image = "rbxassetid://" .. r[1] end
	table.insert(list, o)
end
local got = 0
task.spawn(function()
	CP:PreloadAsync(list, function(id, status)
		got += 1
		if status ~= Enum.AssetFetchStatus.Success then table.insert(bad, id .. " " .. status.Name) end
	end)
	got = -1
end)
local t0 = os.clock()
while got >= 0 and os.clock() - t0 < 40 do task.wait(0.2) end
return #rows .. " ids, finished=" .. tostring(got < 0) .. "\\n" .. table.concat(bad, "\\n")
""" % rows
with open(os.path.join(ROOT, "captures", "_assetaudit.luau"), "w", encoding="utf-8") as f:
    f.write(code)
out = subprocess.run(
    [sys.executable, os.path.join(ROOT, "scripts", "studio_mcp.py"), "luau", SID, "Client", os.path.join("captures", "_assetaudit.luau")],
    capture_output=True, text=True, encoding="utf-8", cwd=ROOT,
).stdout.strip()
print(out)
for line in out.splitlines():
    m = re.search(r"(\d{6,})", line)
    if m and m.group(1) in ids:
        print("  named in", ids[m.group(1)][1])
print("\n".join(problems) or "no missing keys")
print(json.dumps({"ids": len(ids), "problems": len(problems)}))
