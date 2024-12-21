// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { PackageInfo } from './packageinfo';
import { Config } from './config';

const qml_terminal_name = "QML preview";

function getExtensionTerminal(): vscode.Terminal {
	let terminal = vscode.window.terminals.find((terminal, _, __) => terminal.name === qml_terminal_name);
	if (terminal === undefined) {
		terminal = vscode.window.createTerminal(qml_terminal_name);
	}
	return terminal;
}

function preview_qml_command() {
	const config = new Config();
	const qmlPath = config.getQmlPath();

	if (qmlPath === undefined) {
		vscode.window.showErrorMessage("'qmlPath' is not set");
		return;
	}

	let active_editor = vscode.window.activeTextEditor;
	if (active_editor === undefined) {
		return;
	}

	if (active_editor.document.languageId !== "qml") {
		vscode.window.showErrorMessage("current file is not a qml file");
		return;
	}

	if (active_editor.document.isUntitled) {
		vscode.window.showErrorMessage("save the file before attempting to preview it");
		return;
	}

	let current_file = active_editor.document.fileName;
	const terminal = getExtensionTerminal();
	terminal.sendText(`${qmlPath} ${current_file}`);
	terminal.show(true);
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	PackageInfo.init(context);

	const disposable = vscode.commands.registerCommand('qml-preview.PreviewQML', preview_qml_command);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
