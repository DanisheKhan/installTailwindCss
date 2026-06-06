# Tailwind CSS Vite Setup

> **One command. Zero configuration. Tailwind CSS ready in seconds.**

[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-blue?logo=visual-studio-code)](https://marketplace.visualstudio.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Eliminate the repetitive boilerplate of setting up Tailwind CSS in every new Vite React project. This extension automates the entire configuration process — from updating your Vite config to installing packages — all from the VS Code Command Palette.

---

## ✨ Features

| Feature | Description |
|---|---|
| **One-Click Setup** | Run a single command to complete the full Tailwind CSS configuration |
| **Vite Config Update** | Automatically injects the `@tailwindcss/vite` plugin into `vite.config.ts/js` |
| **CSS Injection** | Replaces `index.css` content with the required `@import "tailwindcss"` directive |
| **App Scaffold** | Clears `App.css` and updates `App.jsx` with clean starter code |
| **Background Install** | Runs `npm install` silently in the background — no terminal window interruption |
| **Live Progress** | Displays a real-time progress notification that auto-dismisses on completion |

---

## 🚀 Quick Start

1. Open your existing **Vite React** project in VS Code
2. Open the Command Palette: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
3. Search for and run: **`Setup Tailwind CSS`**
4. Watch the progress notification — it will automatically dismiss when done

---

## 📋 Requirements

- **VS Code** `1.106.1` or higher
- **Node.js** and **npm** installed and available on your system `PATH`
- An existing **Vite React** project with the standard file structure

---

## 🔧 What It Does

The extension performs the following steps **in sequence**:

### 1. Update `vite.config.ts` / `vite.config.js`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### 2. Update `index.css`

```css
@import "tailwindcss";
```

### 3. Clear `src/App.css`

Removes all default Vite styles, leaving a clean slate.

### 4. Update `src/App.jsx`

```jsx
import './App.css'

function App() {
  return (
    <>
      <h1>Danish Khan</h1>
      <p>I am a freelancer. Connect with me if you want to develop a project!</p>
      <p>Email: danishkhan.jsx@gmail.com</p>
    </>
  )
}

export default App;
```

### 5. Install Dependencies

```bash
npm install tailwindcss @tailwindcss/vite
```

Runs silently in the background. A single progress notification tracks all steps and dismisses automatically upon completion.

---

## 🛠️ Troubleshooting

### "No workspace folder found"

You must have a folder or workspace open in VS Code before running this command.

**Fix:** Go to `File → Open Folder` and open your Vite React project.

---

### File not found errors

The extension expects a standard Vite React project structure.

**Required files:**
- `vite.config.ts` or `vite.config.js` (project root)
- `src/App.jsx` and `src/App.css`
- `index.css` (project root or `src/` folder)

---

### npm install fails silently

If packages are not installed after the command completes:

1. Verify your internet connection
2. Confirm Node.js and npm are installed: `node -v` and `npm -v` in a terminal
3. Run the install manually:
   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```

---

## 📝 Release Notes

### v0.3.0 — 2026-06-07

**Improved UX: Unified progress notification**

- Replaced multiple individual notification popups with a single `withProgress` notification
- Progress notification now auto-dismisses when all setup steps are complete
- `npm install` now runs in the background via `child_process.exec` instead of opening a visible terminal
- Added a final "Setup Completed!" confirmation message on success

### v0.2.0

**Stability & quality improvements**

- Enhanced error handling with per-step try/catch blocks to prevent one failure from stopping the rest of the setup
- Improved user-facing warning messages with clearer descriptions
- Better validation of project structure before attempting file writes
- Refined progress notification messaging for each step
- General code cleanup and internal refactoring

### v0.1.0

**Execution order fix**

- Reordered setup steps so all config file updates occur before `npm install` is triggered
- Improved overall execution flow for a more predictable and reliable setup experience
- Updated progress notification wording for clarity

### v0.0.5

**Initial release**

- Automated Tailwind CSS v4 setup for Vite React projects
- Command Palette integration via `Setup Tailwind CSS` command
- Step-by-step progress notifications during setup

---

## 📚 Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [VS Code Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [Vite Documentation](https://vitejs.dev)

---

*Made with ❤️ for developers who'd rather be building than configuring.*
