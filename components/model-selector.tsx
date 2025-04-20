"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bot, Sparkles, Zap, Code, Settings } from "lucide-react"

interface ModelOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

export function ModelSelector() {
  const [selectedModel, setSelectedModel] = useState("gpt-4o")
  const [temperature, setTemperature] = useState(0.7)
  const [useContext, setUseContext] = useState(true)

  const models: ModelOption[] = [
    {
      id: "gpt-4o",
      name: "GPT-4o",
      description: "Самая мощная модель для генерации кода OpenCart",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      id: "gpt-3.5-turbo",
      name: "GPT-3.5 Turbo",
      description: "Быстрая модель для простых задач",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      id: "claude-3",
      name: "Claude 3",
      description: "Альтернативная модель с хорошим пониманием кода",
      icon: <Code className="h-5 w-5" />,
    },
    {
      id: "local",
      name: "Локальная модель",
      description: "Запуск на вашем компьютере без отправки данных",
      icon: <Bot className="h-5 w-5" />,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Настройки AI модели</CardTitle>
        <CardDescription>Выберите модель и настройте параметры генерации</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="text-sm font-medium">Модель</div>
          <div className="grid grid-cols-1 gap-2">
            {models.map((model) => (
              <Button
                key={model.id}
                variant={selectedModel === model.id ? "default" : "outline"}
                className="justify-start h-auto py-3"
                onClick={() => setSelectedModel(model.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">{model.icon}</div>
                  <div className="text-left">
                    <div className="font-medium">{model.name}</div>
                    <div className="text-xs text-muted-foreground">{model.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Температура: {temperature.toFixed(1)}</div>
            <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={() => setTemperature(0.7)}>
              <Settings className="h-3.5 w-3.5" />
              <span className="text-xs">Сбросить</span>
            </Button>
          </div>
          <Slider
            value={[temperature]}
            min={0}
            max={1}
            step={0.1}
            onValueChange={(value) => setTemperature(value[0])}
          />
          <div className="grid grid-cols-3 text-xs text-muted-foreground">
            <div>Точный</div>
            <div className="text-center">Сбалансированный</div>
            <div className="text-right">Творческий</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="use-context" className="text-sm font-medium">
                Использовать контекст проекта
              </Label>
              <p className="text-xs text-muted-foreground">
                Анализировать открытые файлы для лучшего понимания вашего кода
              </p>
            </div>
            <Switch id="use-context" checked={useContext} onCheckedChange={setUseContext} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
