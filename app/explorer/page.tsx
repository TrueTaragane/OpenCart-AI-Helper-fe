import { FileExplorer } from "@/components/file-explorer"
import { ExtensionLayout } from "@/components/layout/extension-layout"

export default function FileExplorerPage() {
  return (
    <ExtensionLayout activeView="explorer">
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4">File Explorer</h2>
        <FileExplorer />
      </div>
    </ExtensionLayout>
  )
}
