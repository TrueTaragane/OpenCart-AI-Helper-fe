"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import type { PromptCategory } from "./prompt-collection-manager"

interface PromptCategorySelectorProps {
  categories: PromptCategory[]
  activeCategory: string
  onSelectCategory: (categoryId: string) => void
}

export function PromptCategorySelector({ categories, activeCategory, onSelectCategory }: PromptCategorySelectorProps) {
  return (
    <div className="mb-2">
      <ScrollArea className="whitespace-nowrap pb-2">
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              activeCategory === "all" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
            }`}
            onClick={() => onSelectCategory("all")}
          >
            Все
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-3 py-1 rounded-full text-sm flex items-center gap-1.5 ${
                activeCategory === category.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              }`}
              onClick={() => onSelectCategory(category.id)}
            >
              <div className={`w-2 h-2 rounded-full ${category.color}`}></div>
              {category.name}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
