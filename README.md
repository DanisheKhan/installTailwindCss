# Tailwind CSS Vite Setup

Automatically setup Tailwind CSS with Vite React in a single command!

## Features

This VS Code extension automates the entire Tailwind CSS setup process for Vite React projects:

- **One-Click Setup**: Execute a single command to complete the entire setup process
- **Auto Config Update**: Updates `vite.config.ts/js` with Tailwind CSS plugin configuration
- **CSS Injection**: Automatically adds `@import "tailwindcss"` to your `index.css`
- **App Updates**: Clears `App.css` and updates `App.jsx` with starter code
- **Automated NPM Install**: Installs `tailwindcss` and `@tailwindcss/vite` packages last
- **Progress Notifications**: Real-time feedback during the setup process

## Requirements

- VS Code 1.106.1 or higher
- Node.js and npm installed
- An existing Vite React project

## Usage

1. Open your Vite React project in VS Code
2. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. Search for and run **"Setup Tailwind CSS"**
4. Wait for the setup to complete (you'll see progress notifications)
5. A terminal will open to run `npm install` - wait for it to finish
6. Once complete, Tailwind CSS will be fully configured in your project!

## What It Does

The extension performs the following automated steps **in order**:

1. **Updates vite.config.ts/js**
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import tailwindcss from '@tailwindcss/vite'

   export default defineConfig({
     plugins: [react(), tailwindcss()],
   })
   ```

2. **Updates index.css**
   ```css
   @import "tailwindcss";
   ```

3. **Clears App.css**
   - Removes all default styles

4. **Updates App.jsx**
   ```jsx
   import './App.css'

   function App() {
     return (
       <>
         <h1>Danish Khan</h1>
       </>
     )
   }

   export default App;
   ```

5. **Installs Dependencies** (LAST STEP)
   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```

## Release Notes

### 0.1.0

- Reordered setup steps: config files updated first, then npm install runs last
- Improved execution flow for better user experience
- Updated progress notifications

### 0.0.5

- Initial release with automated Tailwind CSS setup
- Command palette integration
- Progress notifications

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
