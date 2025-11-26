# Tailwind CSS Vite Setup

**Automatically setup Tailwind CSS with Vite React in a single command!**

Tired of manually configuring Tailwind CSS in your Vite React projects? This VS Code extension eliminates all the tedious setup steps and gets you coding with Tailwind CSS in seconds.

## ✨ Key Features

This VS Code extension automates the entire Tailwind CSS setup process for Vite React projects:

- **One-Click Setup**: Execute a single command to complete the entire setup process
- **Auto Config Update**: Updates `vite.config.ts/js` with Tailwind CSS plugin configuration
- **CSS Injection**: Automatically adds `@import "tailwindcss"` to your `index.css`
- **App Updates**: Clears `App.css` and updates `App.jsx` with starter code
- **Automated NPM Install**: Installs `tailwindcss` and `@tailwindcss/vite` packages last
- **Progress Notifications**: Real-time feedback during the setup process

## 🚀 Quick Start

1. Open your Vite React project in VS Code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type **"Setup Tailwind CSS"** and hit Enter
4. Wait for the process to complete - that's it!

## Requirements

- VS Code 1.106.1 or higher
- Node.js and npm installed
- An existing Vite React project

## 📖 Detailed Usage

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

## Troubleshooting

### Issue: "No workspace folder found"

- Ensure you have a folder or workspace open in VS Code
- Try opening your project folder with `File > Open Folder`

### Issue: File not found errors

- Make sure your project has the standard Vite React structure:
  - `vite.config.ts` or `vite.config.js`
  - `src/App.jsx` and `src/App.css`
  - `index.css` (in root or src folder)

### Issue: npm install doesn't complete

- Check your internet connection
- Ensure Node.js and npm are properly installed
- Try running `npm install` manually in the terminal

## Release Notes

### 0.2.0

- Enhanced error handling and user feedback
- Improved documentation and code comments
- Better validation of project structure
- Refined terminal output messaging
- Code cleanup and optimization

### 0.1.0

- Reordered setup steps: config files updated first, then npm install runs last
- Improved execution flow for better user experience
- Updated progress notifications

### 0.0.5

- Initial release with automated Tailwind CSS setup
- Command palette integration
- Progress notifications

## Extension Guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## For More Information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
