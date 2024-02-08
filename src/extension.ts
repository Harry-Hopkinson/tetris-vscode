import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

let statusBar: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("tetris.start-game", () => {
      const panel = vscode.window.createWebviewPanel(
        "tetris",
        "Tetris",
        vscode.ViewColumn.One,
        {
          // Enable scripts in the webview
          enableScripts: true,
        },
      );

      const filePath = path.join(context.extensionPath, "./src/tetris.html");
      const html = fs.readFileSync(filePath, "utf8");

      panel.webview.html = html;
    }),
  );

  statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100,
  );
  statusBar.command = "tetris.start-game";
  context.subscriptions.push(statusBar);

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateStatusBar),
  );
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection(updateStatusBar),
  );

  updateStatusBar();
}

function updateStatusBar(): void {
  statusBar.text = `$(game)`;
  statusBar.tooltip = "Tetris";
  statusBar.show();
}
