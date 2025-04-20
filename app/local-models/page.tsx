import { LocalModelSetup } from "@/components/local-model-setup"
import { ExtensionLayout } from "@/components/layout/extension-layout"

export default function LocalModelsPage() {
  return (
    <ExtensionLayout activeView="local-models">
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4">Local Models Setup</h2>
        <LocalModelSetup />
      </div>
    </ExtensionLayout>
  )
}
