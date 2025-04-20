"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const templates = [
  {
    id: 1,
    name: "Product Module",
    type: "module",
    description: "A module for displaying featured products with custom settings",
    preview: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 2,
    name: "Category Listing",
    type: "template",
    description: "Custom category listing template with grid and list views",
    preview: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 3,
    name: "Admin Dashboard Widget",
    type: "admin",
    description: "Dashboard widget showing sales statistics and recent orders",
    preview: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 4,
    name: "Product Filter",
    type: "module",
    description: "Advanced product filter with price range and attribute filtering",
    preview: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 5,
    name: "Checkout Modifier",
    type: "ocmod",
    description: "OCMod to modify the checkout process with additional fields",
    preview: "/placeholder.svg?height=100&width=200",
  },
]

export function TemplateViewer() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "all" || template.type === activeTab

    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="module">Modules</TabsTrigger>
            <TabsTrigger value="template">Templates</TabsTrigger>
            <TabsTrigger value="ocmod">OCMod</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <div className="aspect-video bg-muted">
                <img
                  src={template.preview || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Button variant="outline" size="sm">
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex justify-center p-8 text-muted-foreground">
            No templates found matching your criteria
          </div>
        )}
      </div>
    </div>
  )
}
