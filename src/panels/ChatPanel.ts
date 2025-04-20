import * as vscode from "vscode"
import { BasePanel } from "./BasePanel"
import { getNonce } from "../utils"

export class ChatPanel extends BasePanel {
  public static readonly viewType = "opencartAiHelperChat"
  public static currentPanel: ChatPanel | undefined

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined

    // If we already have a panel, show it.
    if (ChatPanel.currentPanel) {
      ChatPanel.currentPanel._panel.reveal(column)
      return
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      ChatPanel.viewType,
      "OpenCart AI Chat",
      column || vscode.ViewColumn.One,
      {
        // Enable javascript in the webview
        enableScripts: true,
        // Restrict the webview to only load resources from the `media` and `dist` directories
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, "media"), vscode.Uri.joinPath(extensionUri, "dist")],
        // Enable state persistence
        retainContextWhenHidden: true,
      },
    )

    ChatPanel.currentPanel = new ChatPanel(panel, extensionUri)
  }

  protected constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, ChatPanel.viewType, "OpenCart AI Chat")
    ChatPanel.currentPanel = this
  }

  protected _getHtmlForWebview(webview: vscode.Webview): string {
    // Get the local path to main script run in the webview
    const scriptUri = this.getScriptUri(webview, "dist", "chat.js")
    const styleUri = this.getStyleUri(webview, "media", "chat.css")
    const codiconsUri = this.getStyleUri(webview, "media", "codicon.css")

    // Use a nonce to only allow specific scripts to be run
    const nonce = getNonce()

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; connect-src https://*.openai.com https://*.googleapis.com http://localhost:* https://*.openrouter.ai;">
        <link href="${styleUri}" rel="stylesheet">
        <link href="${codiconsUri}" rel="stylesheet">
        <title>OpenCart AI Chat</title>
      </head>
      <body>
        <div id="root"></div>
        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>`
  }

  protected _handleMessage(message: any): void {
    super._handleMessage(message)

    switch (message.type) {
      case "sendMessage":
        // Here we would handle sending a message to the AI service
        // For now, we'll just echo it back
        this._simulateAiResponse(message.text)
        return
      case "generateCode":
        this._generateCode(message.prompt, message.language)
        return
      case "saveCode":
        this._saveGeneratedCode(message.code, message.filename)
        return
    }
  }

  private _simulateAiResponse(userMessage: string): void {
    // In a real implementation, this would call an AI service
    // For now, we'll just simulate a response
    setTimeout(() => {
      this.sendMessage({
        type: "aiResponse",
        text: `I received your message: "${userMessage}". Here's a simulated response from the AI.`,
        code: `<?php\nnamespace Opencart\\Admin\\Controller\\Extension\\Module;\n\nclass SimpleModule extends \\Opencart\\System\\Engine\\Controller {\n    // Generated code would go here\n}`,
      })
    }, 1000)
  }

  private async _generateCode(prompt: string, language: string): Promise<void> {
    // In a real implementation, this would call an AI service to generate code
    // For now, we'll just simulate code generation
    const simulatedCode = `<?php
namespace Opencart\\Admin\\Controller\\Extension\\Module;

class GeneratedModule extends \\Opencart\\System\\Engine\\Controller {
    private $error = array();
    
    public function index() {
        $this->load->language('extension/module/generated_module');
        
        $this->document->setTitle($this->language->get('heading_title'));
        
        // This is a simulated response based on prompt: "${prompt}"
        // Language: ${language}
        
        // More code would be generated here
    }
}`

    this.sendMessage({
      type: "generatedCode",
      code: simulatedCode,
      language: language,
    })
  }

  private async _saveGeneratedCode(code: string, filename: string): Promise<void> {
    // Get the workspace folder
    const workspaceFolders = vscode.workspace.workspaceFolders
    if (!workspaceFolders) {
      vscode.window.showErrorMessage("No workspace folder is open")
      return
    }

    // Ask the user where to save the file
    const defaultPath = workspaceFolders[0].uri.fsPath
    const fullPath = await vscode.window.showInputBox({
      prompt: "Enter the path to save the file",
      value: `${defaultPath}/${filename}`,
    })

    if (!fullPath) {
      return // User cancelled
    }

    // Save the file
    await this._saveFile(fullPath, code)
  }
}
