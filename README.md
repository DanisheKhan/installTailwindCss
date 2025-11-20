# Tailwind CSS Vite Setup

Automatically setup Tailwind CSS with Vite React in a single command!

## Features

This VS Code extension automates the entire Tailwind CSS setup process for Vite React projects:

- **One-Click Setup**: Execute a single command to complete the entire setup process
- **Automated NPM Install**: Installs `tailwindcss` and `@tailwindcss/vite` packages
- **Auto Config Update**: Updates `vite.config.ts/js` with Tailwind CSS plugin configuration
- **HTML Injection**: Automatically adds `@import "tailwindcss"` to your `index.html`
- **Progress Notifications**: Real-time feedback during the setup process

## Requirements

- VS Code 1.106.1 or higher
- Node.js and npm installed
- An existing Vite React project

## Usage

1. Open your Vite React project in VS Code
2. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. Search for and run **"Setup Tailwind CSS"**
4. Wait for the setup to complete (you'll see a progress notification)
5. Once complete, Tailwind CSS will be fully configured in your project!

## What It Does

The extension performs the following automated steps:

1. **Installs Dependencies**
   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```

2. **Updates vite.config.ts**
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import tailwindcss from '@tailwindcss/vite'

   export default defineConfig({
     plugins: [react(), tailwindcss()],
   })
   ```

3. **Updates index.css**
   ```css
   @import "tailwindcss";
   ```

## Release Notes

### 0.0.5

- Automated Tailwind CSS setup for Vite React projects
- Command palette integration
- Progress notifications

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
