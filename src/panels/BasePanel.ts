import * as vscode from "vscode"

export abstract class BasePanel {
  protected readonly _panel: vscode.WebviewPanel
  protected readonly _extensionUri: vscode.Uri
  protected readonly _iconPath: vscode.Uri
  protected _disposables: vscode.Disposable[] = []

  public static currentPanel: BasePanel | undefined

  protected constructor(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    protected readonly viewType: string,
    protected readonly title: string,
  ) {
    this._panel = panel
    this._extensionUri = extensionUri
    this._iconPath = vscode.Uri.joinPath(extensionUri, "resources", "rocket-icon-16.svg")

    // Set the webview panel icon
    this._panel.iconPath = this._iconPath

    // Set the webview's initial html content
    this._update()

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programmatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables)

    // Update the content based on view changes
    this._panel.onDidChangeViewState(
      (e) => {
        if (this._panel.visible) {
          this._update()
        }
      },
      null,
      this._disposables,
    )

    // Handle messages from the webview
    this._panel.webview.onDidReceiveMessage(
      (message) => {
        this._handleMessage(message)
      },
      null,
      this._disposables,
    )
  }

  public sendMessage(message: any): void {
    this._panel.webview.postMessage(message)
  }

  protected abstract _getHtmlForWebview(webview: vscode.Webview): string

  protected _handleMessage(message: any): void {
    switch (message.type) {
      case "alert":
        vscode.window.showInformationMessage(message.text)
        return
      case "error":
        vscode.window.showErrorMessage(message.text)
        return
      case "openFile":
        this._openFile(message.path)
        return
      case "saveFile":
        this._saveFile(message.path, message.content)
        return
      case "getSettings":
        this._sendSettings()
        return
    }
  }

  protected _sendSettings(): void {
    const config = vscode.workspace.getConfiguration("opencartAiHelper")
    this.sendMessage({
      type: "settings",
      settings: {
        apiKeys: {
          openai: config.get("apiKeys.openai"),
          gemini: config.get("apiKeys.gemini"),
          openrouter: config.get("apiKeys.openrouter"),
        },
        localModels: {
          ollamaUrl: config.get("localModels.ollamaUrl"),
        },
        defaultModel: config.get("defaultModel"),
        defaultOpenCartVersion: config.get("defaultOpenCartVersion"),
        promptStoragePath: config.get("promptStoragePath"),
      },
    })
  }

  protected async _openFile(path: string): Promise<void> {
    try {
      const uri = vscode.Uri.file(path)
      const document = await vscode.workspace.openTextDocument(uri)
      await vscode.window.showTextDocument(document)
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to open file: ${error}`)
    }
  }

  protected async _saveFile(path: string, content: string): Promise<void> {
    try {
      const uri = vscode.Uri.file(path)
      const encoder = new TextEncoder()
      const data = encoder.encode(content)

      // Check if file exists
      try {
        await vscode.workspace.fs.stat(uri)
        // File exists, ask for confirmation
        const choice = await vscode.window.showWarningMessage(
          `File ${path} already exists. Do you want to overwrite it?`,
          "Overwrite",
          "Cancel",
        )

        if (choice !== "Overwrite") {
          return
        }
      } catch {
        // File doesn't exist, create directory if needed
        const dirUri = vscode.Uri.file(path.substring(0, path.lastIndexOf("/")))
        try {
          await vscode.workspace.fs.stat(dirUri)
        } catch {
          // Directory doesn't exist, create it
          await vscode.workspace.fs.createDirectory(dirUri)
        }
      }

      await vscode.workspace.fs.writeFile(uri, data)
      vscode.window.showInformationMessage(`File saved: ${path}`)

      // Open the file
      await this._openFile(path)
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to save file: ${error}`)
    }
  }

  protected _update() {
    const webview = this._panel.webview
    this._panel.title = this.title
    this._panel.webview.html = this._getHtmlForWebview(webview)
  }

  public dispose() {
    BasePanel.currentPanel = undefined

    // Clean up our resources
    this._panel.dispose()

    while (this._disposables.length) {
      const x = this._disposables.pop()
      if (x) {
        x.dispose()
      }
    }
  }

  protected getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
    return {
      // Enable javascript in the webview
      enableScripts: true,
      // Restrict the webview to only load resources from the `media` directory
      localResourceRoots: [vscode.Uri.joinPath(extensionUri, "media"), vscode.Uri.joinPath(extensionUri, "dist")],
    }
  }

  protected getScriptUri(webview: vscode.Webview, ...pathSegments: string[]): vscode.Uri {
    return webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, ...pathSegments))
  }

  protected getStyleUri(webview: vscode.Webview, ...pathSegments: string[]): vscode.Uri {
    return webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, ...pathSegments))
  }

  protected getMediaUri(webview: vscode.Webview, ...pathSegments: string[]): vscode.Uri {
    return webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", ...pathSegments))
  }
}
