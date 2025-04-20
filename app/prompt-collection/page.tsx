import { PromptCollectionManager } from "@/components/prompt-collection/prompt-collection-manager"

export default function PromptCollectionPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Коллекция промптов</h1>
      <PromptCollectionManager />
    </div>
  )
}
