#!/usr/bin/env node
// One-step setup for Agent HQ, the vault and the Roblox gate. Safe to run again: it updates its own files and never
// overwrites your CLAUDE.md, your settings or your HQ data.
//   node install.mjs                     asks for your game folder
//   node install.mjs --game <folder>     no questions
//   node install.mjs --no-plugin         skip the LihFolk plugin
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import readline from 'node:readline/promises';

const HERE = import.meta.dirname;
const argv = process.argv.slice(2);
const opt = (name) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : undefined; };
const home = opt('--home') || os.homedir();
const claudeDir = path.join(home, '.claude');
const say = (s) => console.log(s);
const ok = (s) => say(`  done: ${s}`);
const warn = (s) => say(`  note: ${s}`);

const has = (cmd) => {
  try { return execSync(`${cmd} --version`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return null; }
};

function copyTree(from, to, skip = () => false) {
  fs.mkdirSync(to, { recursive: true });
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, e.name);
    const b = path.join(to, e.name);
    if (skip(a, b)) continue;
    if (e.isDirectory()) copyTree(a, b, skip);
    else fs.copyFileSync(a, b);
  }
}

// Adds a block once, marked so a second run leaves it alone.
function appendOnce(file, marker, block) {
  const now = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (now.includes(marker)) return false;
  fs.writeFileSync(file, `${now}${now && !now.endsWith('\n') ? '\n' : ''}${block}\n`);
  return true;
}

function addHook() {
  const file = path.join(claudeDir, 'settings.json');
  const command = 'node "$HOME/.claude/hooks/roblox-gate.js"';
  const text = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '{}';
  let s;
  try { s = JSON.parse(text); } catch {
    warn(`${file} is not valid JSON, so the gate hook was not added. Fix that file and run this again.`);
    return;
  }
  s.hooks ??= {};
  s.hooks.UserPromptSubmit ??= [];
  if (JSON.stringify(s.hooks.UserPromptSubmit).includes('roblox-gate.js')) return;
  if (fs.existsSync(file)) fs.copyFileSync(file, `${file}.bak`);
  s.hooks.UserPromptSubmit.push({ hooks: [{ type: 'command', command, timeout: 5 }] });
  fs.writeFileSync(file, `${JSON.stringify(s, null, 2)}\n`);
  ok('added the gate hook to your Claude Code settings (old copy saved as settings.json.bak)');
}

// The newest LihFolk plugin folder, which holds the vault the gate searches.
function lihfolkPath() {
  const dir = path.join(claudeDir, 'plugins', 'cache', 'lihfolk', 'lihfolk');
  if (!fs.existsSync(dir)) return null;
  const [newest] = fs.readdirSync(dir).sort().reverse();
  return newest ? path.join(dir, newest).replaceAll('\\', '/') : null;
}

function installLihfolk() {
  if (argv.includes('--no-plugin')) return;
  if (lihfolkPath()) return ok('LihFolk is already installed');
  if (!has('claude')) return warn('Claude Code was not found, so LihFolk was skipped. Install Claude Code and run this again.');
  try {
    execSync('claude plugin marketplace add lihfolk-cy/v2-vault', { stdio: 'ignore' });
    execSync('claude plugin install lihfolk@lihfolk', { stdio: 'ignore' });
    ok('installed the LihFolk plugin (LihFolk Vault V2, CC BY 4.0)');
  } catch { warn('LihFolk did not install. In Claude Code, type /plugin and add lihfolk-cy/v2-vault.'); }
}

async function gameFolder() {
  const given = opt('--game');
  if (given) return path.resolve(given);
  if (!process.stdin.isTTY) return process.cwd();
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const a = (await rl.question(`Your game's folder [${process.cwd()}]: `)).trim().replace(/^"|"$/g, '');
  rl.close();
  return path.resolve(a || process.cwd());
}

say('Agent HQ Studio setup\n');
say('Checking your PC');
const [major, minor] = process.versions.node.split('.').map(Number);
if (major < 22 || (major === 22 && minor < 13)) { // HQ's database needs node:sqlite without a flag
  say(`  Node ${process.versions.node} is too old. Install the current LTS from https://nodejs.org and run this again.`);
  process.exit(1);
}
ok(`Node ${process.versions.node}`);
for (const [cmd, label, url] of [['git', 'Git', 'https://git-scm.com'], ['python', 'Python', 'https://python.org'], ['claude', 'Claude Code', 'https://claude.com/claude-code']]) {
  if (has(cmd)) ok(label); else warn(`${label} was not found. Agents need it: ${url}`);
}

const game = await gameFolder();
fs.mkdirSync(game, { recursive: true });
say(`\nSetting up ${game}`);
// HQ's own memory and data stay as they are on a second run
copyTree(path.join(HERE, 'tools'), path.join(game, 'tools'), (a, b) => path.basename(path.dirname(a)) === 'memory' && fs.existsSync(b));
copyTree(path.join(HERE, 'scripts'), path.join(game, 'scripts'));
copyTree(path.join(HERE, '.claude', 'skills'), path.join(game, '.claude', 'skills'));
ok('Agent HQ');
const probes = path.join(HERE, 'gate', 'roblox-game-gate', 'tools');
fs.mkdirSync(path.join(game, 'scripts', 'probes'), { recursive: true });
for (const [name, dir] of [['ui_click.py', 'scripts'], ['studio_mcp.py', 'scripts'], ['uiaudit.luau', 'scripts/probes'], ['sections.py', 'scripts/probes'], ['assetaudit.py', 'scripts/probes']]) {
  const to = path.join(game, dir, name);
  if (!fs.existsSync(to)) fs.copyFileSync(path.join(probes, name), to);
}
ok('test tools');
appendOnce(path.join(game, '.gitignore'), '.agent-hq/', '.agent-hq/');
const vaultPath = path.join(HERE, 'vault', 'CLAUDE.md').replaceAll('\\', '/');
if (appendOnce(path.join(game, 'CLAUDE.md'), 'Agent-HQ-Studio vault', `\n<!-- Agent-HQ-Studio vault -->\n@${vaultPath}`)) ok('linked the vault from CLAUDE.md');

say('\nSetting up Claude Code');
installLihfolk();
copyTree(path.join(HERE, 'vault', '.claude', 'skills'), path.join(claudeDir, 'skills'));
copyTree(path.join(HERE, 'gate', 'roblox-game-gate'), path.join(claudeDir, 'skills', 'roblox-game-gate'));
const gate = path.join(claudeDir, 'skills', 'roblox-game-gate', 'SKILL.md');
const lf = lihfolkPath();
if (lf) fs.writeFileSync(gate, fs.readFileSync(gate, 'utf8').replaceAll('C:/Users/YOU/Documents/LihFolk-V2', lf));
ok('Roblox skills and the game gate');
fs.mkdirSync(path.join(claudeDir, 'hooks'), { recursive: true });
fs.copyFileSync(path.join(HERE, 'gate', 'roblox-gate.js'), path.join(claudeDir, 'hooks', 'roblox-gate.js'));
addHook();

say(`\nAll set. Next:
  1. Start HQ: double-click scripts\\Agent HQ.bat in your game folder, or run: node tools/agent-hq/server.mjs
  2. To work with a friend's HQ, open the HQ Link page and follow its two steps.
  3. Start a new Claude Code session so the gate loads.`);
