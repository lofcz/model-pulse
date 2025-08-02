import * as vscode from 'vscode';

export class ModelTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {

    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | null | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

    private models: any[] = [];

    constructor() {}

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
        if (element && element.id) {
            // This is a model item, so return its properties.
            const modelId = element.id;

            const providerValue = 'openrouter';
            const baseUrlValue = 'https://openrouter.ai/api/v1';

            const providerItem = new vscode.TreeItem(`Provider: ${providerValue}`);
            providerItem.iconPath = new vscode.ThemeIcon('copy');
            providerItem.tooltip = `Click to copy '${providerValue}'`;
            providerItem.command = {
                command: 'model-pulse.copyToClipboard',
                title: 'Copy Provider',
                arguments: [providerValue]
            };
            
            const baseUrlItem = new vscode.TreeItem(`Base URL: ${baseUrlValue}`);
            baseUrlItem.iconPath = new vscode.ThemeIcon('copy');
            baseUrlItem.tooltip = `Click to copy '${baseUrlValue}'`;
            baseUrlItem.command = {
                command: 'model-pulse.copyToClipboard',
                title: 'Copy Base URL',
                arguments: [baseUrlValue]
            };

            const modelIdItem = new vscode.TreeItem(`Model ID: ${modelId}`);
            modelIdItem.iconPath = new vscode.ThemeIcon('copy');
            modelIdItem.tooltip = `Click to copy '${modelId}'`;
            modelIdItem.command = {
                command: 'model-pulse.copyToClipboard',
                title: 'Copy Model ID',
                arguments: [modelId]
            };

            return Promise.resolve([providerItem, baseUrlItem, modelIdItem]);
        } else {
            // This is the root, so return the list of models.
            return Promise.resolve(this.models.map(model => {
                const item = new vscode.TreeItem(model.name, vscode.TreeItemCollapsibleState.Collapsed);
                item.id = model.id;
                item.description = `ID: ${model.id}`;
                item.tooltip = model.description;
                return item;
            }));
        }
    }

    updateModels(models: any[]) {
        this.models = models;
        this.refresh();
    }
}
