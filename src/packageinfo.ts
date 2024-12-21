import * as vscode from 'vscode';

export class PackageInfo {
    public static extension: vscode.Extension<any>;

    public static init(context: vscode.ExtensionContext) {
        this.extension = context.extension;
    }

    public static getConfiguration(workspaceFolder?: vscode.WorkspaceFolder): vscode.WorkspaceConfiguration {
        const package_json = this.extension.packageJSON;
        const extension_base_name = package_json.name;
        const config = vscode.workspace.getConfiguration(extension_base_name, workspaceFolder);
        return config;
    }
}