"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Lightbulb, Wand2, Copy, Save, Sparkles, Zap, RefreshCw } from "lucide-react"

export function PromptEngineering() {
  const [basePrompt, setBasePrompt] = useState(
    "Создай модуль для OpenCart 4.x, который отображает товары из определенной категории на главной странице.",
  )
  const [enhancedPrompt, setEnhancedPrompt] = useState("")
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [detailLevel, setDetailLevel] = useState(2)
  const [includeExamples, setIncludeExamples] = useState(true)
  const [includeStructure, setIncludeStructure] = useState(true)

  const enhancePrompt = () => {
    setIsEnhancing(true)

    // Simulate prompt enhancement
    setTimeout(() => {
      const enhanced = `Создай полный модуль для OpenCart 4.x со следующими характеристиками:

1. Название: "Featured Category Products"
2. Функциональность: Отображение товаров из выбранной категории на главной странице
3. Структура файлов:
   - admin/controller/extension/module/featured_category.php
   - admin/language/en-gb/extension/module/featured_category.php
   - admin/view/template/extension/module/featured_category.twig
   - catalog/controller/extension/module/featured_category.php
   - catalog/language/en-gb/extension/module/featured_category.php
   - catalog/view/template/extension/module/featured_category.twig

4. Настройки в админке:
   - Выбор категории (селект)
   - Количество отображаемых товаров (число)
   - Сортировка (селект: новые, популярные, со скидкой)
   - Статус модуля (вкл/выкл)

5. Функции фронтенда:
   - Адаптивное отображение товаров в сетке
   - Кнопки добавления в корзину и избранное
   - Отображение скидок и акций

Пожалуйста, создай полный код для всех необходимых файлов, включая комментарии и документацию.`

      setEnhancedPrompt(enhanced)
      setIsEnhancing(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Улучшение промптов</CardTitle>
          <CardDescription>Оптимизируйте ваши запросы к AI для получения более качественного кода</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="basic">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Базовый промпт</TabsTrigger>
              <TabsTrigger value="enhanced">Улучшенный промпт</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="base-prompt">Ваш запрос</Label>
                <Textarea
                  id="base-prompt"
                  placeholder="Опишите, что вы хотите создать..."
                  value={basePrompt}
                  onChange={(e) => setBasePrompt(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Уровень детализации</Label>
                  <Slider
                    value={[detailLevel]}
                    min={1}
                    max={3}
                    step={1}
                    onValueChange={(value) => setDetailLevel(value[0])}
                  />
                  <div className="grid grid-cols-3 text-xs text-muted-foreground">
                    <div>Базовый</div>
                    <div className="text-center">Стандартный</div>
                    <div className="text-right">Детальный</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-examples">Включить примеры кода</Label>
                    <Switch id="include-examples" checked={includeExamples} onCheckedChange={setIncludeExamples} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-structure">Включить структуру файлов</Label>
                    <Switch id="include-structure" checked={includeStructure} onCheckedChange={setIncludeStructure} />
                  </div>
                </div>

                <Button onClick={enhancePrompt} disabled={isEnhancing || !basePrompt.trim()} className="w-full">
                  {isEnhancing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Улучшаем промпт...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Улучшить промпт
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="enhanced" className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Улучшенный промпт</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      Копировать
                    </Button>
                    <Button variant="outline" size="sm">
                      <Save className="h-3.5 w-3.5 mr-1" />
                      Сохранить
                    </Button>
                  </div>
                </div>
                <ScrollArea className="h-[300px] border rounded-md p-4">
                  {enhancedPrompt ? (
                    <div className="whitespace-pre-wrap">{enhancedPrompt}</div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                      <Sparkles className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">
                        Нажмите "Улучшить промпт", чтобы оптимизировать ваш запрос для лучших результатов
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </div>

              {enhancedPrompt && (
                <div className="rounded-md border p-3 bg-green-50 border-green-200">
                  <h4 className="text-sm font-medium mb-1 flex items-center gap-1 text-green-700">
                    <Lightbulb className="h-4 w-4" />
                    Что улучшено
                  </h4>
                  <ul className="text-xs text-green-700 space-y-1 pl-5 list-disc">
                    <li>Добавлена конкретная структура файлов</li>
                    <li>Указаны детальные настройки для админки</li>
                    <li>Описаны функции фронтенда</li>
                    <li>Добавлены инструкции по документированию кода</li>
                  </ul>
                </div>
              )}

              {enhancedPrompt && (
                <Button className="w-full">
                  <Zap className="mr-2 h-4 w-4" />
                  Использовать этот промпт
                </Button>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
