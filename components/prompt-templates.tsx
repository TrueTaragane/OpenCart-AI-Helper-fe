"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Search, Edit, Trash2, Save, FileCode, LayoutGrid, Settings, ShoppingCart } from "lucide-react"

interface PromptTemplate {
  id: string
  name: string
  category: string
  prompt: string
}

export function PromptTemplates() {
  const [templates, setTemplates] = useState<PromptTemplate[]>([
    {
      id: "1",
      name: "Базовый модуль",
      category: "module",
      prompt:
        "Создай базовый модуль OpenCart 4.x с настройками статуса и заголовка. Модуль должен отображаться на главной странице и иметь базовую структуру файлов.",
    },
    {
      id: "2",
      name: "Модификатор товара",
      category: "ocmod",
      prompt:
        "Создай OCMod модификатор для OpenCart 3.x, который добавляет дополнительное поле на страницу товара. Поле должно отображаться под описанием и иметь возможность редактирования в админке.",
    },
    {
      id: "3",
      name: "Шаблон категории",
      category: "template",
      prompt:
        "Создай TWIG шаблон для страницы категории в OpenCart 3.x с сеткой товаров, фильтрами и сортировкой. Шаблон должен быть адаптивным и поддерживать мобильные устройства.",
    },
    {
      id: "4",
      name: "Контроллер админки",
      category: "controller",
      prompt:
        "Создай контроллер админки для OpenCart 4.x, который добавляет новую страницу в меню каталога. Страница должна отображать список товаров с дополнительными полями и возможностью фильтрации.",
    },
    {
      id: "5",
      name: "Модель для API",
      category: "model",
      prompt:
        "Создай модель для работы с API в OpenCart 3.x. Модель должна иметь методы для получения, добавления, обновления и удаления данных через REST API.",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [editingTemplate, setEditingTemplate] = useState<PromptTemplate | null>(null)

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.prompt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "all" || template.category === activeTab

    return matchesSearch && matchesTab
  })

  const handleEditTemplate = (template: PromptTemplate) => {
    setEditingTemplate({ ...template })
  }

  const handleSaveTemplate = () => {
    if (!editingTemplate) return

    setTemplates((prev) => prev.map((t) => (t.id === editingTemplate.id ? editingTemplate : t)))
    setEditingTemplate(null)
  }

  const handleDeleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "module":
        return <LayoutGrid className="h-4 w-4" />
      case "ocmod":
        return <Settings className="h-4 w-4" />
      case "template":
        return <FileCode className="h-4 w-4" />
      case "controller":
        return <ShoppingCart className="h-4 w-4" />
      default:
        return <FileCode className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Шаблоны промптов</h2>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Новый шаблон
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск шаблонов..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="module">Модули</TabsTrigger>
            <TabsTrigger value="ocmod">OCMod</TabsTrigger>
            <TabsTrigger value="template">Шаблоны</TabsTrigger>
            <TabsTrigger value="controller">Контроллеры</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id}>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(template.category)}
                    <CardTitle className="text-base">{template.name}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEditTemplate(template)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteTemplate(template.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-xs uppercase">{template.category}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-3">{template.prompt}</p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  Использовать
                </Button>
              </CardContent>
            </Card>
          ))}

          {filteredTemplates.length === 0 && (
            <div className="flex justify-center p-8 text-muted-foreground">Шаблоны не найдены</div>
          )}
        </div>
      </ScrollArea>

      {editingTemplate && (
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Редактирование шаблона</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Название</label>
              <Input
                value={editingTemplate.name}
                onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Категория</label>
              <select
                className="w-full p-2 border rounded-md"
                value={editingTemplate.category}
                onChange={(e) => setEditingTemplate({ ...editingTemplate, category: e.target.value })}
              >
                <option value="module">Модуль</option>
                <option value="ocmod">OCMod</option>
                <option value="template">Шаблон</option>
                <option value="controller">Контроллер</option>
                <option value="model">Модель</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Промпт</label>
              <textarea
                className="w-full p-2 border rounded-md min-h-[100px]"
                value={editingTemplate.prompt}
                onChange={(e) => setEditingTemplate({ ...editingTemplate, prompt: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingTemplate(null)}>
                Отмена
              </Button>
              <Button onClick={handleSaveTemplate}>
                <Save className="h-4 w-4 mr-1" />
                Сохранить
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
