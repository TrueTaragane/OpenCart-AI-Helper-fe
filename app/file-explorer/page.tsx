import { FileExplorer } from "@/components/file-explorer"

export default function FileExplorerPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Проводник файлов OpenCart</h1>
      <FileExplorer />
    </div>
  )
}
