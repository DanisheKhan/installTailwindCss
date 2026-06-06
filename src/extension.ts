// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';

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

			await vscode.window.withProgress({
				location: vscode.ProgressLocation.Notification,
				title: "Setting up Tailwind CSS",
				cancellable: false
			}, async (progress) => {
				// Step 1: Update vite.config
				progress.report({ increment: 20, message: "Updating vite.config..." });
				try {
					updateViteConfig(workspacePath);
				} catch (error) {
					const errorMsg = error instanceof Error ? error.message : String(error);
					vscode.window.showWarningMessage(`Could not update vite.config: ${errorMsg}`);
				}
				
				// Step 2: Update index.css
				progress.report({ increment: 20, message: "Updating index.css..." });
				try {
					updateIndexCss(workspacePath);
				} catch (error) {
					const errorMsg = error instanceof Error ? error.message : String(error);
					vscode.window.showWarningMessage(`Could not update index.css: ${errorMsg}`);
				}

				// Step 3: Update App.css
				progress.report({ increment: 20, message: "Clearing App.css..." });
				try {
					updateAppCss(workspacePath);
				} catch (error) {
					const errorMsg = error instanceof Error ? error.message : String(error);
					vscode.window.showWarningMessage(`Could not clear App.css: ${errorMsg}`);
				}

				// Step 4: Update App.jsx
				progress.report({ increment: 20, message: "Updating App.jsx..." });
				try {
					updateAppJsx(workspacePath);
				} catch (error) {
					const errorMsg = error instanceof Error ? error.message : String(error);
					vscode.window.showWarningMessage(`Could not update App.jsx: ${errorMsg}`);
				}

				// Step 5: Install packages
				progress.report({ increment: 20, message: "Installing Tailwind CSS packages..." });
				await new Promise<void>((resolve, reject) => {
					exec('npm install tailwindcss @tailwindcss/vite', { cwd: workspacePath }, (error) => {
						if (error) {
							console.error('npm install error:', error);
							vscode.window.showWarningMessage('Failed to install packages. You may need to run "npm install tailwindcss @tailwindcss/vite" manually.');
						}
						resolve();
					});
				});
			});

			vscode.window.showInformationMessage('Tailwind CSS Setup Completed!');
			
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
      <p>I am a freelancer. Connect with me if you want to develop a project!</p>
      <p>Email: danishkhan.jsx@gmail.com</p>
    </>
  )
}

export default App;`;

	fs.writeFileSync(appJsxPath, appJsxContent, 'utf-8');
}

// This method is called when your extension is deactivated
export function deactivate() {}
