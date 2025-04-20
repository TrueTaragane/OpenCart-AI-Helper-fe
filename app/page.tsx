import { FreeAIChatInterface } from "@/components/free-ai-chat-interface"
import { ExtensionLayout } from "@/components/layout/extension-layout"

export default function HomePage() {
  return (
    <ExtensionLayout activeView="chat">
      <div className="h-full">
        <FreeAIChatInterface />
      </div>
    </ExtensionLayout>
  )
}
