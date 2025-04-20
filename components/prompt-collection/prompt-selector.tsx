"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Star } from "lucide-react"
import type { Prompt, PromptCategory } from "./prompt-collection-manager"
import { PromptCategorySelector } from "./prompt-category-selector"

interface PromptSelectorProps {
  prompts: Prompt[]
  categories: PromptCategory[]
  onSelectPrompt: (prompt: Prompt) => void
  buttonLabel?: string
}

export function PromptSelector({
  prompts,
  categories,
  onSelectPrompt,
  buttonLabel = "Выбрать промпт",
}: PromptSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = activeCategory === "all" || prompt.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const handleSelectPrompt = (prompt: Prompt) => {
    onSelectPrompt(prompt)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Выбор промпта</DialogTitle>
          <DialogDescription>Выберите промпт из вашей коллекции для использования в чате.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск промптов..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <PromptCategorySelector
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          <ScrollArea className="h-[300px]">
            <div className="space-y-2">
              {filteredPrompts.length > 0 ? (
                filteredPrompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className="p-3 border rounded-md cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => handleSelectPrompt(prompt)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="font-medium">{prompt.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2">{prompt.description}</div>
                      </div>
                      {prompt.isFavorite && <Star className="h-4 w-4 fill-amber-400 text-amber-400 ml-2" />}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <Badge variant="outline" className="text-xs px-1.5 py-0">
                        {categories.find((c) => c.id === prompt.category)?.name || prompt.category}
                      </Badge>
                      {prompt.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0">
                          {tag}
                        </Badge>
                      ))}
                      {prompt.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs px-1.5 py-0">
                          +{prompt.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  {searchTerm ? (
                    <p>Промпты не найдены. Попробуйте изменить параметры поиска.</p>
                  ) : (
                    <p>Нет доступных промптов.</p>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
