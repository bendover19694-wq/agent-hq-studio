// UserPromptSubmit hook: on Roblox game coding requests, tells Claude to run the roblox-game-gate skill.
// Fires when the prompt mentions Roblox work, or when the project is a Roblox one and the prompt asks for a change.
const fs = require('fs');
const path = require('path');

let raw = '';
process.stdin.on('data', (d) => (raw += d));
process.stdin.on('end', () => {
  let input = {};
  try {
    input = JSON.parse(raw);
  } catch {
    return;
  }
  const prompt = String(input.prompt || '');
  const cwd = String(input.cwd || process.cwd());
  const named = /\b(roblox|luau|rojo|roblox studio|studio mcp|game ?pass|dev(eloper)? product|datastore|processreceipt|screengui|remoteevent)\b/i.test(prompt);
  const change = /\b(add|build|change|code|create|fix|implement|make|overhaul|polish|redesign|refactor|update|improve|retouch|touch up|bug|broken|ui|game)\b/i.test(prompt);
  let robloxProject = false;
  for (let dir = cwd, i = 0; i < 6; i++, dir = path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'default.project.json')) || fs.existsSync(path.join(dir, 'aftman.toml'))) {
      robloxProject = true;
      break;
    }
    if (dir === path.dirname(dir)) break;
  }
  if (!(change && (named || robloxProject))) return;
  console.log(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'UserPromptSubmit',
        additionalContext:
          'Roblox game coding request. Invoke the roblox-game-gate skill first and follow it: vault search, then section, asset and standards checks, then independent review, before calling the work done.',
      },
    })
  );
});
