"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PromptCard } from "./prompt-card"
import { PromptEditor } from "./prompt-editor"
import { PromptCategorySelector } from "./prompt-category-selector"
import { Search, Plus, FolderOpen, Tag, Save, FileText, Settings, Download, Upload } from "lucide-react"

export interface Prompt {
  id: string
  title: string
  description: string
  content: string
  category: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  isFavorite: boolean
}

export interface PromptCategory {
  id: string
  name: string
  color: string
}

export function PromptCollectionManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [promptStoragePath, setPromptStoragePath] = useState("/path/to/project/prompts")

  // Sample categories
  const [categories, setCategories] = useState<PromptCategory[]>([
    { id: "module", name: "Модули", color: "bg-blue-500" },
    { id: "ocmod", name: "OCMod", color: "bg-green-500" },
    { id: "theme", name: "Темы", color: "bg-purple-500" },
    { id: "controller", name: "Контроллеры", color: "bg-amber-500" },
    { id: "model", name: "Модели", color: "bg-red-500" },
    { id: "general", name: "Общие", color: "bg-gray-500" },
  ])

  // Sample prompts
  const [prompts, setPrompts] = useState<Prompt[]>([
    {
      id: "1",
      title: "Базовый модуль OpenCart 4.x",
      description: "Создает базовую структуру модуля для OpenCart 4.x с настройками в админке",
      content: `Создай полный модуль для OpenCart 4.x со следующими характеристиками:

1. Название: "Basic Module"
2. Функциональность: Базовый модуль с настройками в админке
3. Структура файлов:
   - admin/controller/extension/module/basic_module.php
   - admin/language/en-gb/extension/module/basic_module.php
   - admin/view/template/extension/module/basic_module.twig
   - catalog/controller/extension/module/basic_module.php
   - catalog/language/en-gb/extension/module/basic_module.php
   - catalog/view/template/extension/module/basic_module.twig

4. Настройки в админке:
   - Заголовок модуля (текст)
   - Статус модуля (вкл/выкл)

Пожалуйста, создай полный код для всех необходимых файлов, включая комментарии и документацию.`,
      category: "module",
      tags: ["базовый", "opencart 4.x", "модуль"],
      createdAt: new Date("2023-10-15"),
      updatedAt: new Date("2023-10-15"),
      isFavorite: true,
    },
    {
      id: "2",
      title: "OCMod для изменения страницы товара",
      description: "Модификатор для добавления дополнительного поля на страницу товара",
      content: `Создай OCMod модификатор для OpenCart 3.x, который добавляет дополнительное поле на страницу товара. Модификатор должен:

1. Добавить новое поле "Особенности товара" на странице товара под описанием
2. Добавить возможность редактирования этого поля в админке на странице редактирования товара
3. Сохранять значение поля в базе данных
4. Отображать поле на фронтенде в карточке товара

Пожалуйста, создай полный XML-код модификатора с комментариями и инструкцией по установке.`,
      category: "ocmod",
      tags: ["ocmod", "opencart 3.x", "страница товара"],
      createdAt: new Date("2023-09-20"),
      updatedAt: new Date("2023-09-25"),
      isFavorite: false,
    },
    {
      id: "3",
      title: "Контроллер для API",
      description: "Создает контроллер для работы с API в OpenCart",
      content: `Создай контроллер для API в OpenCart 4.x, который будет обрабатывать запросы к товарам. Контроллер должен:

1. Иметь методы для получения списка товаров (GET)
2. Иметь метод для получения информации о конкретном товаре по ID (GET)
3. Иметь метод для добавления нового товара (POST)
4. Иметь метод для обновления существующего товара (PUT)
5. Иметь метод для удаления товара (DELETE)
6. Включать проверку авторизации через API ключ
7. Возвращать данные в формате JSON

Пожалуйста, создай полный код контроллера с комментариями и примерами использования.`,
      category: "controller",
      tags: ["api", "opencart 4.x", "контроллер", "rest"],
      createdAt: new Date("2023-08-10"),
      updatedAt: new Date("2023-08-15"),
      isFavorite: true,
    },
    {
      id: "4",
      title: "Шаблон категории с фильтрами",
      description: "Создает шаблон страницы категории с расширенными фильтрами",
      content: `Создай TWIG шаблон для страницы категории в OpenCart 3.x с расширенными возможностями фильтрации. Шаблон должен:

1. Иметь адаптивный дизайн (мобильные устройства, планшеты, десктоп)
2. Поддерживать отображение товаров в виде сетки и списка
3. Включать расширенные фильтры:
   - Фильтр по цене (слайдер с диапазоном)
   - Фильтр по брендам (чекбоксы)
   - Фильтр по атрибутам (выпадающие списки)
   - Фильтр по наличию (переключатель)
4. Иметь сортировку по популярности, цене, названию
5. Поддерживать пагинацию и выбор количества товаров на странице

Пожалуйста, создай полный код шаблона с необходимыми стилями и JavaScript.`,
      category: "theme",
      tags: ["twig", "opencart 3.x", "категория", "фильтры"],
      createdAt: new Date("2023-07-05"),
      updatedAt: new Date("2023-07-10"),
      isFavorite: false,
    },
    {
      id: "5",
      title: "Модель для работы с заказами",
      description: "Создает модель для расширенной работы с заказами",
      content: `Создай модель для OpenCart 4.x, которая расширяет стандартную функциональность работы с заказами. Модель должна:

1. Добавлять методы для получения расширенной статистики по заказам
2. Включать функции для группировки заказов по различным параметрам
3. Добавлять методы для экспорта заказов в различные форматы (CSV, Excel, PDF)
4. Включать функции для массового обновления статусов заказов
5. Добавлять методы для работы с историей заказов

Пожалуйста, создай полный код модели с комментариями и примерами использования.`,
      category: "model",
      tags: ["модель", "opencart 4.x", "заказы", "статистика"],
      createdAt: new Date("2023-06-15"),
      updatedAt: new Date("2023-06-20"),
      isFavorite: false,
    },
  ])

  // Filter prompts based on search term, category, and tab
  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = activeCategory === "all" || prompt.category === activeCategory
    const matchesTab = activeTab === "all" || (activeTab === "favorites" && prompt.isFavorite)

    return matchesSearch && matchesCategory && matchesTab
  })

  const handleCreatePrompt = () => {
    const newPrompt: Prompt = {
      id: Date.now().toString(),
      title: "Новый промпт",
      description: "Описание промпта",
      content: "",
      category: "general",
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isFavorite: false,
    }

    setPrompts([...prompts, newPrompt])
    setSelectedPrompt(newPrompt)
    setIsEditing(true)
  }

  const handleEditPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt)
    setIsEditing(true)
  }

  const handleSavePrompt = (updatedPrompt: Prompt) => {
    setPrompts(prompts.map((p) => (p.id === updatedPrompt.id ? updatedPrompt : p)))
    setSelectedPrompt(updatedPrompt)
    setIsEditing(false)
  }

  const handleDeletePrompt = (promptId: string) => {
    setPrompts(prompts.filter((p) => p.id !== promptId))
    if (selectedPrompt?.id === promptId) {
      setSelectedPrompt(null)
    }
  }

  const handleToggleFavorite = (promptId: string) => {
    setPrompts(
      prompts.map((p) => {
        if (p.id === promptId) {
          return { ...p, isFavorite: !p.isFavorite }
        }
        return p
      }),
    )
  }

  const handleSelectPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt)
    setIsEditing(false)
  }

  const handleExportPrompts = () => {
    // In a real extension, this would export prompts to a JSON file
    console.log("Exporting prompts:", prompts)
    setIsExportDialogOpen(false)
  }

  const handleImportPrompts = () => {
    // In a real extension, this would import prompts from a JSON file
    console.log("Importing prompts")
    setIsImportDialogOpen(false)
  }

  const handleBrowseFolder = () => {
    // In a real extension, this would open a folder picker
    console.log("Browsing for prompt storage folder")
    setPromptStoragePath("/new/path/to/prompts")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Коллекция промптов</CardTitle>
              <div className="flex gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setIsImportDialogOpen(true)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Импорт промптов</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setIsExportDialogOpen(true)}>
                        <Upload className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Экспорт промптов</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setIsSettingsDialogOpen(true)}>
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Настройки</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <CardDescription>Сохраняйте и используйте эффективные промпты для генерации кода</CardDescription>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск промптов..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4 pb-2">
              <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="favorites">Избранные</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="px-4 pb-2">
              <PromptCategorySelector
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
            </div>

            <div className="px-4 pb-4">
              <Button className="w-full" onClick={handleCreatePrompt}>
                <Plus className="h-4 w-4 mr-2" />
                Создать промпт
              </Button>
            </div>

            <ScrollArea className="h-[calc(100vh-400px)] px-4 pb-4">
              <div className="space-y-3">
                {filteredPrompts.length > 0 ? (
                  filteredPrompts.map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      prompt={prompt}
                      isSelected={selectedPrompt?.id === prompt.id}
                      onSelect={() => handleSelectPrompt(prompt)}
                      onEdit={() => handleEditPrompt(prompt)}
                      onDelete={() => handleDeletePrompt(prompt.id)}
                      onToggleFavorite={() => handleToggleFavorite(prompt.id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    {searchTerm ? (
                      <p>Промпты не найдены. Попробуйте изменить параметры поиска.</p>
                    ) : (
                      <p>Нет доступных промптов. Создайте новый промпт, чтобы начать.</p>
                    )}
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        {isEditing && selectedPrompt ? (
          <PromptEditor
            prompt={selectedPrompt}
            categories={categories}
            onSave={handleSavePrompt}
            onCancel={() => setIsEditing(false)}
          />
        ) : selectedPrompt ? (
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CardTitle>{selectedPrompt.title}</CardTitle>
                  {selectedPrompt.isFavorite && (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                      Избранное
                    </Badge>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => handleEditPrompt(selectedPrompt)}>
                    Редактировать
                  </Button>
                  <Button variant="default" size="sm">
                    Использовать
                  </Button>
                </div>
              </div>
              <CardDescription>{selectedPrompt.description}</CardDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge
                  variant="outline"
                  className={`${categories.find((c) => c.id === selectedPrompt.category)?.color} bg-opacity-10`}
                >
                  {categories.find((c) => c.id === selectedPrompt.category)?.name}
                </Badge>
                {selectedPrompt.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-300px)] border rounded-md p-4">
                <pre className="whitespace-pre-wrap font-mono text-sm">{selectedPrompt.content}</pre>
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex flex-col items-center justify-center p-8 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Выберите промпт</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Выберите промпт из коллекции или создайте новый, чтобы просмотреть его содержимое и использовать для
              генерации кода.
            </p>
            <Button onClick={handleCreatePrompt}>
              <Plus className="h-4 w-4 mr-2" />
              Создать промпт
            </Button>
          </Card>
        )}
      </div>

      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Импорт промптов</DialogTitle>
            <DialogDescription>Импортируйте промпты из JSON файла в вашу коллекцию.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2">
              <Input type="file" accept=".json" />
              <Button variant="outline" size="sm">
                Обзор
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="replace-existing" className="rounded border-gray-300" />
              <Label htmlFor="replace-existing">Заменить существующие промпты</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleImportPrompts}>Импортировать</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Экспорт промптов</DialogTitle>
            <DialogDescription>Экспортируйте промпты из вашей коллекции в JSON файл.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Что экспортировать</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Выберите промпты для экспорта" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все промпты</SelectItem>
                  <SelectItem value="favorites">Только избранные</SelectItem>
                  <SelectItem value="selected">Выбранные категории</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Путь для сохранения</Label>
              <div className="flex gap-2">
                <Input value="/path/to/export/prompts.json" readOnly />
                <Button variant="outline" size="sm">
                  Обзор
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleExportPrompts}>Экспортировать</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Настройки коллекции промптов</DialogTitle>
            <DialogDescription>Настройте параметры хранения и отображения промптов.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Папка для хранения промптов</Label>
              <div className="flex gap-2">
                <Input value={promptStoragePath} readOnly />
                <Button variant="outline" size="sm" onClick={handleBrowseFolder}>
                  <FolderOpen className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Промпты будут сохранены в этой папке в формате JSON.</p>
            </div>
            <div className="space-y-2">
              <Label>Управление категориями</Label>
              <div className="border rounded-md p-3 space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <span>{category.name}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Tag className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Добавить категорию
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={() => setIsSettingsDialogOpen(false)}>
              <Save className="h-4 w-4 mr-2" />
              Сохранить настройки
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
