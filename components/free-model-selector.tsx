"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Sparkles, Zap, Code, Settings, Globe } from "lucide-react"

interface ModelOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  provider: string
}

export function FreeModelSelector() {
  const [selectedModel, setSelectedModel] = useState("gemini-pro")
  const [temperature, setTemperature] = useState(0.7)
  const [useContext, setUseContext] = useState(true)

  const models: ModelOption[] = [
    {
      id: "gemini-pro",
      name: "Gemini Pro",
      description: "Бесплатная модель от Google с хорошими возможностями для кода",
      icon: <Sparkles className="h-5 w-5" />,
      provider: "Google",
    },
    {
      id: "mistral-small",
      name: "Mistral Small",
      description: "Компактная и быстрая модель с хорошим пониманием кода",
      icon: <Zap className="h-5 w-5" />,
      provider: "Mistral AI",
    },
    {
      id: "openrouter-llama3",
      name: "Llama 3 (OpenRouter)",
      description: "Доступ к Llama 3 через OpenRouter с бесплатными запросами",
      icon: <Globe className="h-5 w-5" />,
      provider: "OpenRouter",
    },
    {
      id: "ollama-codellama",
      name: "CodeLlama (Ollama)",
      description: "Локальная модель для генерации кода без отправки данных",
      icon: <Code className="h-5 w-5" />,
      provider: "Локально через Ollama",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Настройки бесплатной AI модели</CardTitle>
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
                    <div className="text-xs text-muted-foreground mt-0.5">{model.description}</div>
                    <div className="text-xs mt-1">
                      <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                        {model.provider}
                      </span>
                    </div>
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

        <div className="rounded-md border p-3 bg-muted/50">
          <h4 className="text-sm font-medium mb-2">Настройка API ключей</h4>
          <p className="text-xs text-muted-foreground mb-2">
            Для некоторых моделей требуется настройка API ключей. Вы можете добавить их в настройках расширения.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            <Settings className="h-3.5 w-3.5 mr-2" />
            Настроить API ключи
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
