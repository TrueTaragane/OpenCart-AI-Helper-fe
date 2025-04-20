import { OpenCartVersionManager } from "@/components/opencart-version-manager"
import { ExtensionLayout } from "@/components/layout/extension-layout"

export default function VersionManagerPage() {
  return (
    <ExtensionLayout activeView="versions">
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4">OpenCart Version Manager</h2>
        <OpenCartVersionManager />
      </div>
    </ExtensionLayout>
  )
}
