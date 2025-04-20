import * as vscode from "vscode"
import { getNonce } from "../utils"

export class OpenCartAiHelperViewProvider implements vscode.WebviewViewProvider {
  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this._extensionUri, "media"),
        vscode.Uri.joinPath(this._extensionUri, "dist"),
      ],
    }

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview)

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "openChat":
          vscode.commands.executeCommand("opencart-ai-helper.openChat")
          break
        case "openPromptCollection":
          vscode.commands.executeCommand("opencart-ai-helper.openPromptCollection")
          break
        case "openFileExplorer":
          vscode.commands.executeCommand("opencart-ai-helper.openFileExplorer")
          break
        case "openVersionManager":
          vscode.commands.executeCommand("opencart-ai-helper.openVersionManager")
          break
        case "openProjectSetup":
          vscode.commands.executeCommand("opencart-ai-helper.openProjectSetup")
          break
        case "openSettings":
          vscode.commands.executeCommand("opencart-ai-helper.openSettings")
          break
      }
    })
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "dist", "sidebar.js"))
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "sidebar.css"))
    const codiconsUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "codicon.css"))
    const iconUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "resources", "rocket-icon-16.svg"))

    // Use a nonce to only allow specific scripts to be run
    const nonce = getNonce()

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; img-src ${webview.cspSource};">
        <link href="${styleUri}" rel="stylesheet">
        <link href="${codiconsUri}" rel="stylesheet">
        <link rel="icon" href="${iconUri}" type="image/svg+xml">
        <title>OpenCart AI Helper</title>
      </head>
      <body>
        <div id="sidebar-root"></div>
        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>`
  }
}
