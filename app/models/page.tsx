import { FreeModelSelector } from "@/components/free-model-selector"
import { ExtensionLayout } from "@/components/layout/extension-layout"

export default function ModelsPage() {
  return (
    <ExtensionLayout activeView="models">
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4">AI Models</h2>
        <FreeModelSelector />
      </div>
    </ExtensionLayout>
  )
}
