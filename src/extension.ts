// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as cp from 'child_process';

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

			// Show progress notification
			vscode.window.withProgress(
				{
					location: vscode.ProgressLocation.Notification,
					title: 'Setting up Tailwind CSS with Vite...',
					cancellable: false,
				},
				async (progress) => {
					try {
						// Step 1: Install npm packages
						progress.report({ increment: 0, message: 'Installing tailwindcss and @tailwindcss/vite...' });
						await runNpmInstall(workspaceFolder.uri.fsPath);
						progress.report({ increment: 33 });

						// Step 2: Update vite.config.js
						progress.report({ message: 'Updating vite.config.js...' });
						await updateViteConfig(workspaceFolder.uri.fsPath);
						progress.report({ increment: 33 });

						// Step 3: Update index.css
						progress.report({ message: 'Updating index.css...' });
						await updateIndexCss(workspaceFolder.uri.fsPath);
						progress.report({ increment: 33 });

						vscode.window.showInformationMessage('✓ Tailwind CSS setup completed successfully!');
					} catch (error) {
						const errorMsg = error instanceof Error ? error.message : String(error);
						vscode.window.showErrorMessage(`Setup failed: ${errorMsg}`);
						console.error('Setup error:', error);
					}
				}
			);
		} catch (error) {
			const errorMsg = error instanceof Error ? error.message : String(error);
			vscode.window.showErrorMessage(`Extension error: ${errorMsg}`);
		}
	});

	context.subscriptions.push(disposable);
}

async function runNpmInstall(workspacePath: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const isWindows = process.platform === 'win32';
		const command = isWindows ? 'npm.cmd' : 'npm';
		
		const proc = cp.spawn(command, ['install', 'tailwindcss', '@tailwindcss/vite'], {
			cwd: workspacePath,
			stdio: 'pipe',
			shell: true
		});

		let stderr = '';
		let stdout = '';

		proc.stdout?.on('data', (data) => {
			stdout += data.toString();
			console.log('npm install output:', data.toString());
		});

		proc.stderr?.on('data', (data) => {
			stderr += data.toString();
			console.error('npm install error:', data.toString());
		});

		proc.on('close', (code) => {
			if (code === 0) {
				console.log('npm install completed successfully');
				resolve();
			} else {
				reject(new Error(`npm install failed with code ${code}: ${stderr}`));
			}
		});

		proc.on('error', (err) => {
			reject(new Error(`Failed to run npm install: ${err.message}`));
		});
	});
}

async function updateViteConfig(workspacePath: string): Promise<void> {
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

async function updateIndexCss(workspacePath: string): Promise<void> {
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
