import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('tetris.start-game', () => {
        const panel = vscode.window.createWebviewPanel(
            'tetris',
            'Tetris',
            vscode.ViewColumn.One,
            {
                // Enable scripts in the webview
                enableScripts: true
            }
        );

        const filePath = path.join(context.extensionPath, 'tetris.html');
        const html = fs.readFileSync(filePath, 'utf8');

        panel.webview.html = html;
    });

    context.subscriptions.push(disposable);
}