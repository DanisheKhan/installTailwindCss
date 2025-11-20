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

			// Step 1: Create and show terminal with npm install command
			const terminal = vscode.window.createTerminal('Tailwind CSS Setup');
			terminal.show();
			
			// Execute npm install command
			const isWindows = process.platform === 'win32';
			const npmCmd = isWindows ? 'npm install tailwindcss @tailwindcss/vite' : 'npm install tailwindcss @tailwindcss/vite';
			
			terminal.sendText(npmCmd);
			
			// Wait a moment for user to see the command executing
			await new Promise(resolve => setTimeout(resolve, 2000));
			
			// Show progress message
			vscode.window.showInformationMessage('Installing Tailwind CSS... Please wait for npm to complete.');
			
			// Wait for npm to likely finish (adjust timeout as needed)
			await new Promise(resolve => setTimeout(resolve, 15000));
			
			// Step 2: Update vite.config
			try {
				updateViteConfig(workspacePath);
				vscode.window.showInformationMessage('✓ Updated vite.config.ts/js');
			} catch (error) {
				const errorMsg = error instanceof Error ? error.message : String(error);
				vscode.window.showWarningMessage(`Could not update vite.config: ${errorMsg}`);
			}
			
			// Step 3: Update index.css
			try {
				updateIndexCss(workspacePath);
				vscode.window.showInformationMessage('✓ Updated index.css');
			} catch (error) {
				const errorMsg = error instanceof Error ? error.message : String(error);
				vscode.window.showWarningMessage(`Could not update index.css: ${errorMsg}`);
			}
			
			vscode.window.showInformationMessage('✓ Tailwind CSS setup completed! Check the terminal to confirm npm installation finished.');
			
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

	let cssContent = fs.readFileSync(cssPath, 'utf-8');

	// Check if tailwindcss import already exists
	if (cssContent.includes('@import "tailwindcss"')) {
		console.log('Tailwindcss import already exists in index.css');
		return;
	}

	// Add @import "tailwindcss"; at the beginning of the file
	cssContent = `@import "tailwindcss";\n\n${cssContent}`;

	fs.writeFileSync(cssPath, cssContent, 'utf-8');
}

// This method is called when your extension is deactivated
export function deactivate() {}
