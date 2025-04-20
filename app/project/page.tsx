import { ProjectSetupWizard } from "@/components/project-setup-wizard"
import { ExtensionLayout } from "@/components/layout/extension-layout"

export default function ProjectSetupPage() {
  return (
    <ExtensionLayout activeView="project">
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4">Project Setup</h2>
        <ProjectSetupWizard />
      </div>
    </ExtensionLayout>
  )
}
