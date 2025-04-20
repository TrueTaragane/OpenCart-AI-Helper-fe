import * as vscode from "vscode"
import { ChatPanel } from "./panels/ChatPanel"
import { PromptCollectionPanel } from "./panels/PromptCollectionPanel"
import { FileExplorerPanel } from "./panels/FileExplorerPanel"
import { VersionManagerPanel } from "./panels/VersionManagerPanel"
import { ProjectSetupPanel } from "./panels/ProjectSetupPanel"
import { SettingsPanel } from "./panels/SettingsPanel"
import { SidebarProvider } from "./providers/SidebarProvider"
import { OpenCartAiHelperViewProvider } from "./providers/OpenCartAiHelperViewProvider"

// Helper function to get the rocket icon URI
function getRocketIconUri(extensionUri: vscode.Uri): vscode.Uri {
  return vscode.Uri.joinPath(extensionUri, "resources", "rocket-icon-16.svg")
}

export function activate(context: vscode.ExtensionContext) {
  console.log("OpenCart AI Helper is now active!")

  // Make the rocket icon available to all panels
  const rocketIconUri = getRocketIconUri(context.extensionUri)

  // Register the sidebar view provider
  const sidebarProvider = new SidebarProvider(context.extensionUri)
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "opencartAiHelperView",
      new OpenCartAiHelperViewProvider(context.extensionUri),
    ),
  )

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand("opencart-ai-helper.start", () => {
      vscode.commands.executeCommand("opencart-ai-helper.openChat")
    }),
  )

  context.subscriptions.push(
    vscode.commands.registerCommand("opencart-ai-helper.openChat", () => {
      ChatPanel.createOrShow(context.extensionUri)
    }),
  )

  context.subscriptions.push(
    vscode.commands.registerCommand("opencart-ai-helper.openPromptCollection", () => {
      PromptCollectionPanel.createOrShow(context.extensionUri)
    }),
  )

  context.subscriptions.push(
    vscode.commands.registerCommand("opencart-ai-helper.openFileExplorer", () => {
      FileExplorerPanel.createOrShow(context.extensionUri)
    }),
  )

  context.subscriptions.push(
    vscode.commands.registerCommand("opencart-ai-helper.openVersionManager", () => {
      VersionManagerPanel.createOrShow(context.extensionUri)
    }),
  )

  context.subscriptions.push(
    vscode.commands.registerCommand("opencart-ai-helper.openProjectSetup", () => {
      ProjectSetupPanel.createOrShow(context.extensionUri)
    }),
  )

  context.subscriptions.push(
    vscode.commands.registerCommand("opencart-ai-helper.openSettings", () => {
      SettingsPanel.createOrShow(context.extensionUri)
    }),
  )

  // Register context menu commands
  context.subscriptions.push(
    vscode.commands.registerCommand("opencart-ai-helper.generateModule", async () => {
      const editor = vscode.window.activeTextEditor
      if (editor) {
        // Get selected text if any
        const selection = editor.selection
        const selectedText = editor.document.getText(selection)

        // Open chat with pre-filled prompt
        await vscode.commands.executeCommand("opencart-ai-helper.openChat")
        // Send message to webview to pre-fill the prompt
        ChatPanel.currentPanel?.sendMessage({
          type: "prefill-prompt",
          value: selectedText
            ? `Generate an OpenCart module based on this: ${selectedText}`
            : "Generate an OpenCart module",
        })
      } else {
        await vscode.commands.executeCommand("opencart-ai-helper.openChat")
        ChatPanel.currentPanel?.sendMessage({
          type: "prefill-prompt",
          value: "Generate an OpenCart module",
        })
      }
    }),
  )

  context.subscriptions.push(
    vscode.commands.registerCommand("opencart-ai-helper.generateController", async () => {
      const editor = vscode.window.activeTextEditor
      if (editor) {
        const selection = editor.selection
        const selectedText = editor.document.getText(selection)

        await vscode.commands.executeCommand("opencart-ai-helper.openChat")
        ChatPanel.currentPanel?.sendMessage({
          type: "prefill-prompt",
          value: selectedText
            ? `Generate an OpenCart controller based on this: ${selectedText}`
            : "Generate an OpenCart controller",
        })
      } else {
        await vscode.commands.executeCommand("opencart-ai-helper.openChat")
        ChatPanel.currentPanel?.sendMessage({
          type: "prefill-prompt",
          value: "Generate an OpenCart controller",
        })
      }
    }),
  )

  context.subscriptions.push(
    vscode.commands.registerCommand("opencart-ai-helper.generateOCMod", async () => {
      const editor = vscode.window.activeTextEditor
      if (editor) {
        const selection = editor.selection
        const selectedText = editor.document.getText(selection)

        await vscode.commands.executeCommand("opencart-ai-helper.openChat")
        ChatPanel.currentPanel?.sendMessage({
          type: "prefill-prompt",
          value: selectedText
            ? `Generate an OpenCart OCMod based on this: ${selectedText}`
            : "Generate an OpenCart OCMod",
        })
      } else {
        await vscode.commands.executeCommand("opencart-ai-helper.openChat")
        ChatPanel.currentPanel?.sendMessage({
          type: "prefill-prompt",
          value: "Generate an OpenCart OCMod",
        })
      }
    }),
  )

  // Listen for settings changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("opencartAiHelper")) {
        // Notify all panels about settings changes
        ChatPanel.currentPanel?.sendMessage({ type: "settings-changed" })
        PromptCollectionPanel.currentPanel?.sendMessage({ type: "settings-changed" })
        FileExplorerPanel.currentPanel?.sendMessage({ type: "settings-changed" })
        VersionManagerPanel.currentPanel?.sendMessage({ type: "settings-changed" })
        ProjectSetupPanel.currentPanel?.sendMessage({ type: "settings-changed" })
      }
    }),
  )
}

export function deactivate() {}
