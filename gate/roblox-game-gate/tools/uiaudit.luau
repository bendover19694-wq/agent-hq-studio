--!nocheck
-- Layout audit of whatever is on screen, against the vault's numbers: text 12 px or larger, tap targets 44 px or
-- larger (touch only, a HitPad counts), no text wider or taller than its box, no button off the screen. Run in the Client context during play:
--   python scripts/studio_mcp.py luau <studio_id> Client scripts/probes/uiaudit.luau

local UserInputService = game:GetService("UserInputService")
local gui = game:GetService("Players").LocalPlayer:WaitForChild("PlayerGui")
local cam = workspace.CurrentCamera.ViewportSize
local touch = UserInputService.TouchEnabled

local function shown(o)
	local scale, p = 1, o
	while p and p ~= gui do
		if p:IsA("GuiObject") and not p.Visible then
			return nil
		end
		if p:IsA("ScreenGui") and not p.Enabled then
			return nil
		end
		local s = p:FindFirstChildOfClass("UIScale")
		if s then
			scale *= s.Scale
		end
		p = p.Parent
	end
	return scale
end

local seen, lines = {}, {}
local function flag(kind, o, detail)
	local key = kind .. o.Name .. detail
	if not seen[key] then
		seen[key] = true
		local text = if o:IsA("TextLabel") or o:IsA("TextButton") then o.Text:sub(1, 34) else o.Name
		table.insert(lines, `{kind} {detail} "{text}" in {o.Parent.Parent.Name}/{o.Parent.Name}`)
	end
end

for _, o in gui:GetDescendants() do
	if not o:IsA("GuiObject") then
		continue
	end
	local pos, size = o.AbsolutePosition, o.AbsoluteSize
	-- CanvasGroup text is rocket decal art; bigger than the screen is a dim layer
	if
		size.X < 1
		or pos.X > cam.X
		or pos.Y > cam.Y
		or pos.X + size.X < 0
		or pos.Y + size.Y < 0
		or o.Parent:IsA("CanvasGroup")
		or size.X > cam.X
	then
		continue
	end
	local scale = shown(o)
	if not scale then
		continue
	end
	if (o:IsA("TextLabel") or o:IsA("TextButton")) and o.Text ~= "" and o.TextTransparency < 1 then
		local px = if o.TextScaled then o.TextBounds.Y else o.TextSize * scale
		if px < 11.5 then
			flag("SMALL", o, `{math.floor(px * 10) / 10}px`)
		end
		if not o.TextScaled and (o.TextBounds.X > size.X + 2 or o.TextBounds.Y > size.Y + 2) then
			flag("OVERFLOW", o, `{math.floor(o.TextBounds.X)}x{math.floor(o.TextBounds.Y)} in {size.X}x{size.Y}`)
		end
	end
	if o:IsA("GuiButton") and o.Name ~= "HitPad" and (pos.X < -2 or pos.Y < -2 or pos.X + size.X > cam.X + 2 or pos.Y + size.Y > cam.Y + 2) then
		if not o:FindFirstAncestorWhichIsA("ScrollingFrame") then
			flag("OFFSCREEN", o, `{math.floor(pos.X)},{math.floor(pos.Y)} {size.X}x{size.Y}`)
		end
	end
	local pad = o:FindFirstChild("HitPad")
	if touch and o:IsA("GuiButton") and o.Active and math.min(size.X, size.Y) < 43 and not (pad and pad.Visible) then
		flag("TINY", o, `{size.X}x{size.Y}`)
	end
end
table.sort(lines)
local out = `viewport {cam.X}x{cam.Y}, {#lines} findings\n` .. table.concat(lines, "\n")
print(out)
return out
