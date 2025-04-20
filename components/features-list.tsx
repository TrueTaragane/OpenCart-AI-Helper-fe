import { Check } from "lucide-react"

export function FeaturesList() {
  const features = [
    {
      title: "AI-Powered Code Generation",
      description: "Create modules, OCMod modifiers, and templates with AI assistance",
    },
    {
      title: "Modern User Interface",
      description: "Intuitive chat interface with file upload capabilities",
    },
    {
      title: "Template Support",
      description: "Generate both TWIG templates (OpenCart 3.x) and TPL templates (OpenCart 2.x)",
    },
    {
      title: "Customizable Outputs",
      description: "Fine-tune generated code to match your specific requirements",
    },
    {
      title: "VS Code Integration",
      description: "Seamlessly works within your development environment",
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Key Features</h3>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex gap-2">
            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
            <div>
              <span className="font-medium">{feature.title}:</span> {feature.description}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
