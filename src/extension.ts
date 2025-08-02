import * as vscode from 'vscode';
import axios from 'axios';
import { ModelTreeDataProvider } from './ModelTreeDataProvider';

let statusBarItem: vscode.StatusBarItem;
let modelTreeDataProvider: ModelTreeDataProvider;

export function activate(context: vscode.ExtensionContext) {
    console.log('ModelPulse: Extension is activating.');

    modelTreeDataProvider = new ModelTreeDataProvider();
    vscode.window.registerTreeDataProvider('model-pulse-activitybar', modelTreeDataProvider);
    console.log('ModelPulse: Tree view provider registered.');

    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'model-pulse.checkForNewModels';
    context.subscriptions.push(statusBarItem);

    const copyToClipboardCommand = vscode.commands.registerCommand('model-pulse.copyToClipboard', (text: string) => {
        vscode.env.clipboard.writeText(text);
        vscode.window.showInformationMessage(`Copied to clipboard: ${text}`);
    });

    const checkForNewModelsCommand = vscode.commands.registerCommand('model-pulse.checkForNewModels', async () => {
        await checkForNewModels(context, modelTreeDataProvider);
    });

    context.subscriptions.push(copyToClipboardCommand, checkForNewModelsCommand);

    // Set up a recurring check every hour
    setInterval(() => {
        console.log('ModelPulse: Hourly check for new models.');
        checkForNewModels(context, modelTreeDataProvider);
    }, 3600000);

    updateStatusBar(context);
    checkForNewModels(context, modelTreeDataProvider); // Initial check on activation
    console.log('Congratulations, your extension "model-pulse" is now active!');
}

async function checkForNewModels(context: vscode.ExtensionContext, provider: ModelTreeDataProvider) {
    console.log('ModelPulse: Checking for new models...');
    statusBarItem.text = `$(sync~spin) Checking Models...`;
    try {
        const response = await axios.get('https://openrouter.ai/api/v1/models');
        const models = response.data.data;
        const freeModels = models.filter((model: any) => model.pricing?.prompt === '0' && model.pricing?.completion === '0');

        provider.updateModels(freeModels);

        const knownModels = context.globalState.get<any[]>('knownModels', []);
        const newModels = freeModels.filter((model: any) => !knownModels.some(known => known.id === model.id));

        if (newModels.length > 0) {
            vscode.window.showInformationMessage(`Found ${newModels.length} new free models on OpenRouter.`, 'View Models').then(selection => {
                if (selection === 'View Models') {
                    vscode.commands.executeCommand('workbench.view.extension.model-pulse-activitybar.focus');
                }
            });
            context.globalState.update('knownModels', freeModels);
        }

        context.globalState.update('lastModelCheck', new Date().toISOString());
        console.log('ModelPulse: Model check complete.');
    } catch (error) {
        console.error('Error checking for new models:', error);
        vscode.window.showErrorMessage('Error checking for new models. See debug console for details.');
    } finally {
        updateStatusBar(context);
    }
}

function updateStatusBar(context: vscode.ExtensionContext) {
    const lastCheck = context.globalState.get<string>('lastModelCheck');
    if (lastCheck) {
        statusBarItem.text = `$(sync) Models Last Checked: ${new Date(lastCheck).toLocaleTimeString()}`;
    } else {
        statusBarItem.text = `$(sync) Check for new models`;
    }
    statusBarItem.show();
}

export function deactivate() {
    console.log('ModelPulse: Extension deactivated.');
}
