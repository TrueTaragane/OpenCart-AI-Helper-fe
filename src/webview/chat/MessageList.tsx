import type * as React from "react"
import type { Message } from "./types"

interface MessageListProps {
  messages: Message[]
  isGenerating: boolean
  messagesEndRef: React.RefObject<HTMLDivElement>
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isGenerating, messagesEndRef }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div key={message.id} className={`message ${message.role === "user" ? "user-message" : "assistant-message"}`}>
          <div className="message-avatar">
            {message.role === "user" ? (
              <i className="codicon codicon-account"></i>
            ) : (
              <i className="codicon codicon-hubot"></i>
            )}
          </div>
          <div className="message-content">
            <div className="message-text">{message.content}</div>
            <div className="message-time">
              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        </div>
      ))}

      {isGenerating && (
        <div className="message assistant-message">
          <div className="message-avatar">
            <i className="codicon codicon-hubot"></i>
          </div>
          <div className="message-content">
            <div className="message-text typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef}></div>
    </div>
  )
}
