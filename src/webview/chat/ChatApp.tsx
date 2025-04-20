"use client"

import type * as React from "react"
import { useState, useEffect, useRef } from "react"
import { vscode } from "./vscode"
import type { Message } from "./types"
import { ChatInput } from "./ChatInput"
import { MessageList } from "./MessageList"

export const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Привет! Я ваш AI-помощник для OpenCart. Опишите, какой модуль, модификатор или шаблон вы хотите создать, и я помогу вам сгенерировать код.",
      timestamp: new Date(),
    },
  ])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")
  const [activeTab, setActiveTab] = useState("chat")
  const [settings, setSettings] = useState<any>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Request settings from the extension
    vscode.postMessage({ type: "getSettings" })

    // Listen for messages from the extension
    const messageListener = (event: MessageEvent) => {
      const message = event.data

      switch (message.type) {
        case "aiResponse":
          addMessage("assistant", message.text)
          if (message.code) {
            setGeneratedCode(message.code)
          }
          setIsGenerating(false)
          break
        case "generatedCode":
          setGeneratedCode(message.code)
          setActiveTab("code")
          break
        case "settings":
          setSettings(message.settings)
          break
        case "prefill-prompt":
          // Pre-fill the input when opened from a context menu command
          document.getElementById("chat-input")?.setAttribute("data-prefill", message.value)
          break
      }
    }

    window.addEventListener("message", messageListener)
    return () => window.removeEventListener("message", messageListener)
  }, [])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const addMessage = (role: "user" | "assistant", content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    // Add user message
    addMessage("user", text)
    setIsGenerating(true)

    // Send message to extension
    vscode.postMessage({
      type: "sendMessage",
      text,
    })
  }

  const handleGenerateCode = (prompt: string, language = "php") => {
    vscode.postMessage({
      type: "generateCode",
      prompt,
      language,
    })
  }

  const handleSaveCode = (filename = "generated_module.php") => {
    vscode.postMessage({
      type: "saveCode",
      code: generatedCode,
      filename,
    })
  }

  const handleCopyCode = () => {
    vscode.postMessage({
      type: "copyToClipboard",
      text: generatedCode,
    })
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="model-info">
          <span className="model-icon"></span>
          <span className="model-name">{settings.defaultModel || "AI Model"}</span>
        </div>
        <div className="tabs">
          <button className={`tab ${activeTab === "chat" ? "active" : ""}`} onClick={() => setActiveTab("chat")}>
            Chat
          </button>
          <button className={`tab ${activeTab === "code" ? "active" : ""}`} onClick={() => setActiveTab("code")}>
            Code
          </button>
        </div>
      </div>

      <div className="chat-content">
        {activeTab === "chat" && (
          <div className="messages-container">
            <MessageList messages={messages} isGenerating={isGenerating} messagesEndRef={messagesEndRef} />
          </div>
        )}

        {activeTab === "code" && (
          <div className="code-container">
            <div className="code-header">
              <span>Generated Code</span>
              <div className="code-actions">
                <button onClick={handleCopyCode} className="action-button">
                  <i className="codicon codicon-copy"></i> Copy
                </button>
                <button onClick={() => handleSaveCode()} className="action-button">
                  <i className="codicon codicon-save"></i> Save
                </button>
              </div>
            </div>
            <div className="code-editor">
              <pre>{generatedCode}</pre>
            </div>
          </div>
        )}
      </div>

      <ChatInput onSendMessage={handleSendMessage} isGenerating={isGenerating} onGenerateCode={handleGenerateCode} />
    </div>
  )
}
