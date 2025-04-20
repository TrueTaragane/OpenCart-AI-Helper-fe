"use client"

import type * as React from "react"
import { useState, useEffect, useRef } from "react"

interface ChatInputProps {
  onSendMessage: (text: string) => void
  isGenerating: boolean
  onGenerateCode: (prompt: string, language?: string) => void
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isGenerating, onGenerateCode }) => {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // Check if there's a prefill value from context menu commands
    const inputElement = document.getElementById("chat-input")
    const prefill = inputElement?.getAttribute("data-prefill")
    if (prefill) {
      setInput(prefill)
      inputElement.removeAttribute("data-prefill")
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (!input.trim() || isGenerating) return
    onSendMessage(input)
    setInput("")
  }

  const handleGenerateCode = () => {
    if (!input.trim() || isGenerating) return
    onGenerateCode(input)
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  return (
    <div className="chat-input-container">
      <textarea
        id="chat-input"
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={isGenerating}
        rows={1}
      />
      <div className="input-actions">
        <button
          className="action-button generate-code"
          onClick={handleGenerateCode}
          disabled={!input.trim() || isGenerating}
        >
          <i className="codicon codicon-code"></i>
        </button>
        <button className="action-button send" onClick={handleSendMessage} disabled={!input.trim() || isGenerating}>
          <i className="codicon codicon-send"></i>
        </button>
      </div>
    </div>
  )
}
