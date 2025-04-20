"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Server, Download, Check, AlertCircle, Code, Cpu, HardDrive, RefreshCw, Loader2 } from "lucide-react"

export function LocalModelSetup() {
  const [activeTab, setActiveTab] = useState("ollama")
  const [ollamaUrl, setOllamaUrl] = useState("http://localhost:11434")
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"none" | "success" | "error">("none")
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)

  const testConnection = () => {
    setIsTestingConnection(true)
    setConnectionStatus("none")

    // Simulate connection test
    setTimeout(() => {
      setIsTestingConnection(false)
      setConnectionStatus(Math.random() > 0.3 ? "success" : "error")
    }, 1500)
  }

  const downloadModel = () => {
    setIsDownloading(true)
    setDownloadProgress(0)

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        const newProgress = prev + Math.random() * 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsDownloading(false)
          return 100
        }
        return newProgress
      })
    }, 500)
  }

  const models = [
    {
      id: "codellama-7b",
      name: "CodeLlama 7B",
      description: "Легкая модель для генерации кода",
      size: "4.1 ГБ",
      installed: true,
    },
    {
      id: "codellama-13b",
      name: "CodeLlama 13B",
      description: "Сбалансированная модель для генерации кода",
      size: "7.3 ГБ",
      installed: false,
    },
    {
      id: "llama3-8b",
      name: "Llama 3 8B",
      description: "Универсальная модель для текста и кода",
      size: "4.7 ГБ",
      installed: false,
    },
    {
      id: "mistral-7b",
      name: "Mistral 7B",
      description: "Эффективная модель с хорошим пониманием кода",
      size: "4.1 ГБ",
      installed: false,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Настройка локальных моделей</CardTitle>
        <CardDescription>Запускайте AI модели локально для приватности и работы без интернета</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="ollama" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ollama">Ollama</TabsTrigger>
            <TabsTrigger value="localai">LocalAI</TabsTrigger>
          </TabsList>
          <TabsContent value="ollama" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="ollama-url">URL сервера Ollama</Label>
              <div className="flex gap-2">
                <Input
                  id="ollama-url"
                  value={ollamaUrl}
                  onChange={(e) => setOllamaUrl(e.target.value)}
                  placeholder="http://localhost:11434"
                />
                <Button onClick={testConnection} disabled={isTestingConnection}>
                  {isTestingConnection ? <Loader2 className="h-4 w-4 animate-spin" /> : <Server className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {connectionStatus === "success" && (
              <Alert variant="default" className="bg-green-50 border-green-200 text-green-800">
                <Check className="h-4 w-4" />
                <AlertTitle>Соединение установлено</AlertTitle>
                <AlertDescription>Сервер Ollama доступен и готов к использованию.</AlertDescription>
              </Alert>
            )}

            {connectionStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Ошибка соединения</AlertTitle>
                <AlertDescription>
                  Не удалось подключиться к серверу Ollama. Убедитесь, что сервер запущен и доступен по указанному URL.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Доступные модели</Label>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                  Обновить
                </Button>
              </div>
              <ScrollArea className="h-[300px] border rounded-md">
                <div className="p-4 space-y-4">
                  {models.map((model) => (
                    <div
                      key={model.id}
                      className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex gap-3">
                        <Checkbox id={`model-${model.id}`} checked={model.installed} />
                        <div>
                          <Label htmlFor={`model-${model.id}`} className="text-base font-medium">
                            {model.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{model.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              <HardDrive className="h-3 w-3 mr-1" />
                              {model.size}
                            </Badge>
                            {model.installed && (
                              <Badge
                                variant="secondary"
                                className="text-xs bg-green-100 text-green-800 hover:bg-green-100"
                              >
                                <Check className="h-3 w-3 mr-1" />
                                Установлено
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant={model.installed ? "outline" : "default"}
                        size="sm"
                        onClick={model.installed ? undefined : downloadModel}
                        disabled={isDownloading && !model.installed}
                      >
                        {model.installed ? (
                          "Использовать"
                        ) : isDownloading ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                            {downloadProgress.toFixed(0)}%
                          </>
                        ) : (
                          <>
                            <Download className="h-3.5 w-3.5 mr-1" />
                            Скачать
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <Alert>
              <Cpu className="h-4 w-4" />
              <AlertTitle>Требования к системе</AlertTitle>
              <AlertDescription>
                Для запуска моделей локально рекомендуется минимум 8 ГБ оперативной памяти и 10 ГБ свободного места на
                диске.
              </AlertDescription>
            </Alert>
          </TabsContent>
          <TabsContent value="localai" className="space-y-4 pt-4">
            <div className="flex items-center justify-center h-[300px] text-center p-4">
              <div>
                <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Поддержка LocalAI</h3>
                <p className="text-muted-foreground mb-4">
                  Поддержка LocalAI будет добавлена в следующем обновлении расширения.
                </p>
                <Button variant="outline">Подписаться на обновления</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
