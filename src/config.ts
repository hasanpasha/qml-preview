import * as vscode from 'vscode';
import { PackageInfo } from "./packageinfo";

export class Config {
    public qmlPath?: string;

    constructor() {
        const globalSettings = PackageInfo.getConfiguration();
        this.qmlPath = globalSettings.get("qmlPath");

        //TODO: implement current workspace settings
        // const workspaceFolders = vscode.workspace.workspaceFolders ?? [];
        // for (const workspaceFolder of workspaceFolders) {
        //     console.log(`${workspaceFolder.uri}`);
        //     const config = new Config();
        //     const settings = PackageInfo.getConfiguration(workspaceFolder);

        //     workspaceFolder

        //     config.qmlPath = settings.get("qmlPath");

        //     this.qmlPath ||= config.qmlPath;
        // }
    }

    getQmlPath(): string | undefined {
        const path = this.qmlPath;
        if (path) {
            return path;
        }
    }
}