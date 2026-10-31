"""Section-by-section audit. Walks every screen after the first session, screenshots it and runs uiaudit on it.

Usage: python -u scripts/probes/sections.py <studio_id> <label>
Play mode must be running with a profile past the first session (run ftue.py first in the same play session).
The screens to walk are listed in scripts/probes/sections.json.
Screenshots land in captures/sec_<label>_<section>.png. Prints one block per section.
"""
import json
import os
import subprocess
import sys
import time

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SID, LABEL = sys.argv[1], sys.argv[2]
MCP = [sys.executable, os.path.join(ROOT, "scripts", "studio_mcp.py")]


def run(args):
    return subprocess.run(args, capture_output=True, text=True, encoding="utf-8", cwd=ROOT).stdout.strip()


def click(text, wait=900):
    return "clicked" in run([sys.executable, os.path.join(ROOT, "scripts", "ui_click.py"), SID, text, str(wait)])


def clear():
    # whatever popped up meanwhile (milestones, trip reports): their usual buttons, then any close button
    for word in ("CONTINUE", "LATER", "LET'S GROW", "CLAIM", "Close"):
        click(word, 500)


def audit(name):
    run(MCP + ["call", "screen_capture", json.dumps({"studio_id": SID, "capture_id": f"sec_{LABEL}_{name}"})])
    out = run(MCP + ["luau", SID, "Client", os.path.join("scripts", "probes", "uiaudit.luau")])
    # the map behind a sheet is not this section's finding
    lines = [l for l in out.splitlines() if not any(s in l for s in ("Bodies/", "HitPad"))]
    print(f"== {name}\n" + "\n".join(line[:110] for line in lines[:30]), flush=True)


def errors():
    out = run(MCP + ["call", "get_console_output", json.dumps({"studio_id": SID})])
    hits = sorted({l[:140] for l in out.splitlines() if "attempt to" in l or "Stack Begin" in l})
    print("== console")
    print("\n".join(hits) or "no script errors", flush=True)


# one entry per screen: {"name", "steps": clicks to reach it, "leave": click to leave it}
SECTIONS = json.load(open(os.path.join(ROOT, "scripts", "probes", "sections.json"), encoding="utf-8"))

for sec in SECTIONS:
    name, steps, leave = sec["name"], sec["steps"], sec["leave"]
    clear()
    ok = all([click(step) for step in steps])
    if not ok:  # a popup landed in the way: start the section again
        clear()
        ok = all([click(step) for step in steps])
    time.sleep(0.6)
    if not ok:
        print(f"== {name}\nCOULD NOT REACH", flush=True)
    audit(name)
    if leave:
        click(leave, 500)
errors()
