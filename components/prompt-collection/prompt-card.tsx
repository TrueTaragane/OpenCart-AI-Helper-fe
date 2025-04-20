"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Star, Edit, Trash2, StarOff } from "lucide-react"
import type { Prompt } from "./prompt-collection-manager"

interface PromptCardProps {
  prompt: Prompt
  isSelected: boolean
  onSelect: () => void
  onEdit: () => void
  onDelete: () => void
  onToggleFavorite: () => void
}

export function PromptCard({ prompt, isSelected, onSelect, onEdit, onDelete, onToggleFavorite }: PromptCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <Card
      className={`cursor-pointer hover:border-primary/50 transition-colors ${isSelected ? "border-primary" : ""}`}
      onClick={onSelect}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="font-medium line-clamp-1">{prompt.title}</div>
            <div className="text-xs text-muted-foreground line-clamp-2">{prompt.description}</div>
          </div>
          <div className="flex gap-1 ml-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleFavorite()
                    }}
                  >
                    {prompt.isFavorite ? (
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ) : (
                      <StarOff className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{prompt.isFavorite ? "Удалить из избранного" : "Добавить в избранное"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge variant="outline" className="text-xs px-1.5 py-0">
            {prompt.category}
          </Badge>
          {prompt.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0">
              {tag}
            </Badge>
          ))}
          {prompt.tags.length > 2 && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              +{prompt.tags.length - 2}
            </Badge>
          )}
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-muted-foreground">{formatDate(prompt.updatedAt)}</div>
          <div className="flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEdit()
                    }}
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Редактировать</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete()
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Удалить</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
