import { PromptCollectionManager } from "@/components/prompt-collection/prompt-collection-manager"
import { ExtensionLayout } from "@/components/layout/extension-layout"

export default function PromptCollectionPage() {
  return (
    <ExtensionLayout activeView="prompts">
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4">Prompt Collection</h2>
        <PromptCollectionManager />
      </div>
    </ExtensionLayout>
  )
}
