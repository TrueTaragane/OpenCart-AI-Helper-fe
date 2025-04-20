import * as React from "react"
import * as ReactDOM from "react-dom"
import { ChatApp } from "./ChatApp"
import "./chat.css"

ReactDOM.render(
  <React.StrictMode>
    <ChatApp />
  </React.StrictMode>,
  document.getElementById("root"),
)
