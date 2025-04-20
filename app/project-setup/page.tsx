import { ProjectSetupWizard } from "@/components/project-setup-wizard"

export default function ProjectSetupPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Настройка проекта OpenCart</h1>
      <ProjectSetupWizard />
    </div>
  )
}
