"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Save, X, Plus } from "lucide-react"
import type { Prompt, PromptCategory } from "./prompt-collection-manager"

interface PromptEditorProps {
  prompt: Prompt
  categories: PromptCategory[]
  onSave: (prompt: Prompt) => void
  onCancel: () => void
}

export function PromptEditor({ prompt, categories, onSave, onCancel }: PromptEditorProps) {
  const [editedPrompt, setEditedPrompt] = useState<Prompt>({ ...prompt })
  const [newTag, setNewTag] = useState("")

  const handleAddTag = () => {
    if (newTag.trim() && !editedPrompt.tags.includes(newTag.trim())) {
      setEditedPrompt({
        ...editedPrompt,
        tags: [...editedPrompt.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedPrompt({
      ...editedPrompt,
      tags: editedPrompt.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleSave = () => {
    onSave({
      ...editedPrompt,
      updatedAt: new Date(),
    })
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>Редактирование промпта</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Название</Label>
          <Input
            id="title"
            value={editedPrompt.title}
            onChange={(e) => setEditedPrompt({ ...editedPrompt, title: e.target.value })}
            placeholder="Введите название промпта"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Описание</Label>
          <Textarea
            id="description"
            value={editedPrompt.description}
            onChange={(e) => setEditedPrompt({ ...editedPrompt, description: e.target.value })}
            placeholder="Введите краткое описание промпта"
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Категория</Label>
          <Select
            value={editedPrompt.category}
            onValueChange={(value) => setEditedPrompt({ ...editedPrompt, category: value })}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${category.color}`}></div>
                    <span>{category.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Теги</Label>
          <div className="flex gap-2">
            <Input
              id="tags"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Добавить тег"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddTag()
                }
              }}
            />
            <Button type="button" variant="outline" onClick={handleAddTag}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {editedPrompt.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <button
                  type="button"
                  className="ml-1 rounded-full hover:bg-muted p-0.5"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {editedPrompt.tags.length === 0 && (
              <div className="text-xs text-muted-foreground">Нет тегов. Добавьте теги для лучшей организации.</div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Содержимое промпта</Label>
          <ScrollArea className="h-[calc(100vh-500px)] border rounded-md">
            <Textarea
              id="content"
              value={editedPrompt.content}
              onChange={(e) => setEditedPrompt({ ...editedPrompt, content: e.target.value })}
              placeholder="Введите содержимое промпта"
              className="min-h-[300px] border-0 resize-none"
            />
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Отмена
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Сохранить
        </Button>
      </CardFooter>
    </Card>
  )
}
