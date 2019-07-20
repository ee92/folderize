import * as vscode from 'vscode';
import { init } from './src/folderize';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
		'extension.folderize',
		init
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}