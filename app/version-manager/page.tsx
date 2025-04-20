import { OpenCartVersionManager } from "@/components/opencart-version-manager"

export default function VersionManagerPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Управление версиями OpenCart</h1>
      <OpenCartVersionManager />
    </div>
  )
}
