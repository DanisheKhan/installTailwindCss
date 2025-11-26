// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Tailwind CSS Vite Setup extension is now active!');

	// Register the command to setup Tailwind CSS
	const disposable = vscode.commands.registerCommand('tailwind-vite-setup.setupTailwind', async () => {
		try {
			const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
			if (!workspaceFolder) {
				vscode.window.showErrorMessage('No workspace folder found. Please open a workspace first.');
				return;
			}

			const workspacePath = workspaceFolder.uri.fsPath;

			// Step 1: Update vite.config
			try {
				updateViteConfig(workspacePath);
				vscode.window.showInformationMessage('✓ Updated vite.config.ts/js');
			} catch (error) {
				const errorMsg = error instanceof Error ? error.message : String(error);
				vscode.window.showWarningMessage(`Could not update vite.config: ${errorMsg}`);
			}
			
			// Step 2: Update index.css
			try {
				updateIndexCss(workspacePath);
				vscode.window.showInformationMessage('✓ Updated index.css');
			} catch (error) {
				const errorMsg = error instanceof Error ? error.message : String(error);
				vscode.window.showWarningMessage(`Could not update index.css: ${errorMsg}`);
			}

			// Step 3: Update App.css
			try {
				updateAppCss(workspacePath);
				vscode.window.showInformationMessage('✓ Cleared App.css');
			} catch (error) {
				const errorMsg = error instanceof Error ? error.message : String(error);
				vscode.window.showWarningMessage(`Could not clear App.css: ${errorMsg}`);
			}

			// Step 4: Update App.jsx
			try {
				updateAppJsx(workspacePath);
				vscode.window.showInformationMessage('✓ Updated App.jsx');
			} catch (error) {
				const errorMsg = error instanceof Error ? error.message : String(error);
				vscode.window.showWarningMessage(`Could not update App.jsx: ${errorMsg}`);
			}

			// Step 5: Create terminal and run npm install (LAST STEP)
			const terminal = vscode.window.createTerminal('Tailwind CSS Setup');
			terminal.show();
			
			const npmCmd = 'npm install tailwindcss @tailwindcss/vite';
			terminal.sendText(npmCmd);
			
			vscode.window.showInformationMessage('Installing Tailwind CSS packages... Please wait for npm to complete.');
			
		} catch (error) {
			const errorMsg = error instanceof Error ? error.message : String(error);
			vscode.window.showErrorMessage(`Error: ${errorMsg}`);
			console.error('Extension error:', error);
		}
	});

	context.subscriptions.push(disposable);
}

function updateViteConfig(workspacePath: string): void {
	const viteConfigPath = path.join(workspacePath, 'vite.config.ts');
	const viteConfigPathJs = path.join(workspacePath, 'vite.config.js');

	let configPath = '';
	if (fs.existsSync(viteConfigPath)) {
		configPath = viteConfigPath;
	} else if (fs.existsSync(viteConfigPathJs)) {
		configPath = viteConfigPathJs;
	} else {
		throw new Error('vite.config.ts or vite.config.js not found');
	}

	const newConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})`;

	fs.writeFileSync(configPath, newConfig, 'utf-8');
}

function updateIndexCss(workspacePath: string): void {
	const indexCssPath = path.join(workspacePath, 'index.css');
	const srcIndexCssPath = path.join(workspacePath, 'src', 'index.css');

	let cssPath = '';
	if (fs.existsSync(indexCssPath)) {
		cssPath = indexCssPath;
	} else if (fs.existsSync(srcIndexCssPath)) {
		cssPath = srcIndexCssPath;
	} else {
		throw new Error('index.css not found in project root or src folder');
	}

	// Replace entire file with just the tailwindcss import
	const cssContent = `@import "tailwindcss";`;
	fs.writeFileSync(cssPath, cssContent, 'utf-8');
}

function updateAppCss(workspacePath: string): void {
	const appCssPath = path.join(workspacePath, 'src', 'App.css');

	if (!fs.existsSync(appCssPath)) {
		throw new Error('App.css not found in src folder');
	}

	// Clear App.css - write empty content
	fs.writeFileSync(appCssPath, '', 'utf-8');
}

function updateAppJsx(workspacePath: string): void {
	const appJsxPath = path.join(workspacePath, 'src', 'App.jsx');

	if (!fs.existsSync(appJsxPath)) {
		throw new Error('App.jsx not found in src folder');
	}

	const appJsxContent = `import './App.css'

function App() {
  return (
    <>
      <h1>Danish Khan</h1>
    </>
  )
}

export default App;`;

	fs.writeFileSync(appJsxPath, appJsxContent, 'utf-8');
}

// This method is called when your extension is deactivated
export function deactivate() {}
