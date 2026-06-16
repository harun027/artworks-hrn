# Re-scaffold as Full TanStack Start (SSR + Server Functions) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current router-only TanStack Router scaffold with a full TanStack Start app that supports SSR and server functions (`createServerFn`).

**Architecture:** The current scaffold uses `@tanstack/react-router` in router-only mode (no SSR, no server functions). We need to re-scaffold using the TanStack CLI in full Start mode (omitting `--router-only`), which produces a project with `@tanstack/react-start`, an SSR document shell in `__root.tsx`, and server-function capability. We preserve `.git/`, `docs/`, and `.superpowers/` throughout.

**Tech Stack:** TanStack Start (React + TypeScript), Vite, Tailwind CSS, Netlify deployment adapter, npm

---

## Files to be Created/Modified

The scaffold will create (or regenerate) all of these:
- `package.json` — must include `@tanstack/react-start` in dependencies
- `src/routes/__root.tsx` — must include `HeadContent`, `Scripts`, and an HTML shell
- `src/routes/index.tsx` — home route
- `vite.config.ts` — must use `@tanstack/start/plugin` (or equivalent Start plugin)
- `tsconfig.json` — TypeScript config
- `.cta.json` — scaffold metadata; must NOT have `routerOnly: true`
- `index.html` (possibly absent in Start SSR mode — Start generates the document shell in `__root.tsx`)
- `app.config.ts` or similar (TanStack Start server config if generated)

Files to preserve (never delete or overwrite):
- `.git/`
- `docs/`
- `.superpowers/`

---

### Task 1: Remove the wrong scaffold files

**Files:**
- Delete: `src/`, `public/`, `node_modules/`, `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `tsr.config.json`, `index.html`, `.cta.json`, `.vscode/`, `.tanstack/`, `AGENTS.md`, `README.md`, `.gitignore`, `prettier.config.*` (if any)

- [ ] **Step 1: Remove scaffold files (PowerShell)**

Run from the repo root `E:\hrn-project\artworks-hrn`:

```powershell
# Items to remove — keep .git, docs, .superpowers
$toRemove = @(
  "src",
  "public",
  "node_modules",
  "package.json",
  "package-lock.json",
  "vite.config.ts",
  "tsconfig.json",
  "tsr.config.json",
  "index.html",
  ".cta.json",
  ".vscode",
  ".tanstack",
  "AGENTS.md",
  "README.md",
  ".gitignore"
)
foreach ($item in $toRemove) {
  $path = Join-Path "E:\hrn-project\artworks-hrn" $item
  if (Test-Path $path) {
    Remove-Item -Recurse -Force $path
    Write-Host "Removed: $item"
  } else {
    Write-Host "Not found (skip): $item"
  }
}
```

- [ ] **Step 2: Verify only safe dirs remain**

```powershell
Get-ChildItem -Path "E:\hrn-project\artworks-hrn" -Force | Select-Object Name, Attributes
```

Expected output: only `.git`, `docs`, `.superpowers` remain.

---

### Task 2: Scaffold full TanStack Start app

**Files:**
- Creates: all scaffold files at `E:\hrn-project\artworks-hrn\`

- [ ] **Step 1: Run TanStack CLI to scaffold full Start app**

Primary command (try this first):

```powershell
cd "E:\hrn-project\artworks-hrn"
npx @tanstack/cli@latest create . --framework react --no-examples --deployment netlify --package-manager npm --no-git -y
```

If it asks about non-empty directory: pipe `y` or use `--non-interactive` or `--yes` flag. The key flags:
- `.` — scaffold into current directory
- `--framework react` — React framework
- `--no-examples` — no demo pages
- `--deployment netlify` — Netlify adapter
- `--package-manager npm`
- `--no-git` — do NOT reinitialize git (repo already exists)
- `-y` / `--yes` — accept defaults

Fallback command if primary fails (different CLI):

```powershell
echo "y" | npx @tanstack/create-start@latest . --framework react --no-examples --deployment netlify --package-manager npm --no-git
```

- [ ] **Step 2: Verify scaffold is full Start (NOT router-only)**

```powershell
Get-Content "E:\hrn-project\artworks-hrn\.cta.json"
```

Check that `.cta.json` does NOT contain `"routerOnly": true`. If it does, the scaffold failed — try a different flag combination or report BLOCKED.

Also check `package.json` includes `@tanstack/react-start`:

```powershell
Get-Content "E:\hrn-project\artworks-hrn\package.json" | Select-String "react-start"
```

Expected: a line like `"@tanstack/react-start": "^X.Y.Z"`.

- [ ] **Step 3: Verify `__root.tsx` has SSR shell**

```powershell
Get-Content "E:\hrn-project\artworks-hrn\src\routes\__root.tsx"
```

Expected: imports `HeadContent`, `Scripts` (or similar) from `@tanstack/react-start`, and renders `<html>`, `<head>`, `<body>` tags.

---

### Task 3: Install any missing required dependencies

**Files:**
- Modify: `package.json`, `package-lock.json`

Required runtime deps (check which are already in package.json from scaffold):
- `@tanstack/react-query`
- `zod`
- `react-hook-form`
- `@hookform/resolvers`
- `resend`

Required dev deps:
- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `jsdom`
- `@vitejs/plugin-react`

- [ ] **Step 1: Check which deps are already present**

```powershell
Get-Content "E:\hrn-project\artworks-hrn\package.json"
```

Note which of the required deps above are missing.

- [ ] **Step 2: Install missing runtime deps**

Replace the list below with only what's actually missing:

```powershell
cd "E:\hrn-project\artworks-hrn"
npm install @tanstack/react-query zod react-hook-form @hookform/resolvers resend
```

(Skip any already present in package.json.)

- [ ] **Step 3: Install missing dev deps**

```powershell
cd "E:\hrn-project\artworks-hrn"
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitejs/plugin-react
```

(Skip any already present.)

---

### Task 4: Verify dev server boots

**Files:** (none modified)

- [ ] **Step 1: Start dev server on a safe port**

TanStack Start dev command is typically `npm run dev`. Port 3000 may fail with EACCES on this machine — use 5173 instead.

Check what the dev script is:

```powershell
Get-Content "E:\hrn-project\artworks-hrn\package.json" | Select-String "dev"
```

Then start the server (kill after confirming it's up):

```powershell
cd "E:\hrn-project\artworks-hrn"
$proc = Start-Process -FilePath "npm" -ArgumentList "run dev -- --port 5173 --host 127.0.0.1" -PassThru -NoNewWindow -RedirectStandardOutput "E:\hrn-project\artworks-hrn\dev-out.txt" -RedirectStandardError "E:\hrn-project\artworks-hrn\dev-err.txt"
Start-Sleep -Seconds 20
Get-Content "E:\hrn-project\artworks-hrn\dev-out.txt"
Get-Content "E:\hrn-project\artworks-hrn\dev-err.txt"
Stop-Process -Id $proc.Id -Force
```

Or use Bash:

```bash
cd /e/hrn-project/artworks-hrn
timeout 30 npm run dev -- --port 5173 --host 127.0.0.1 2>&1 | head -50
```

Expected: output contains "Local:" or "ready" or a URL like `http://127.0.0.1:5173`.

- [ ] **Step 2: Kill dev server**

Ensure no server process remains running after verification.

---

### Task 5: Stage and commit

**Files:** All new scaffold files

- [ ] **Step 1: Stage all new files**

```powershell
cd "E:\hrn-project\artworks-hrn"
git add -A
git status
```

Verify the correct files are staged (new scaffold files), and `docs/`, `.superpowers/` are untouched.

- [ ] **Step 2: Commit**

```powershell
git commit -m "chore: re-scaffold as full TanStack Start (SSR + server functions)"
```

- [ ] **Step 3: Verify git log**

```powershell
git log --oneline
```

Expected: 3 commits — the two original commits plus the new one at the top.

---

## Self-Review Checklist

Before reporting done, verify each of the following:

- [ ] `package.json` includes `@tanstack/react-start` (not just `@tanstack/react-router`)
- [ ] `.cta.json` does NOT have `"routerOnly": true`
- [ ] `src/routes/__root.tsx` includes `HeadContent`, `Scripts`, and an HTML document shell
- [ ] All required deps are in package.json: `@tanstack/react-query`, `zod`, `react-hook-form`, `@hookform/resolvers`, `resend`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`
- [ ] Dev server boots without errors
- [ ] Git working tree is clean after commit
- [ ] `docs/` and `.superpowers/` are intact and unchanged
