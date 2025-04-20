"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { FolderOpen, Download, FileArchive, AlertCircle, CheckCircle2, FolderTree, RefreshCw } from "lucide-react"

type ProjectType = "module" | "ocmod" | "theme" | "controller" | "model"
type OpenCartVersion = "4.x" | "3.x" | "2.x"

interface ProjectSetupStep {
  id: string
  title: string
  description: string
  isCompleted: boolean
  isActive: boolean
}

export function ProjectSetupWizard() {
  const [projectName, setProjectName] = useState("")
  const [projectType, setProjectType] = useState<ProjectType>("module")
  const [projectPath, setProjectPath] = useState("")
  const [openCartVersion, setOpenCartVersion] = useState<OpenCartVersion>("4.x")
  const [downloadOption, setDownloadOption] = useState("full")
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isIndexing, setIsIndexing] = useState(false)
  const [indexingProgress, setIndexingProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(1)
  const [setupCompleted, setSetupCompleted] = useState(false)
  const [indexingOptions, setIndexingOptions] = useState({
    includeCore: true,
    includeExtensions: false,
    includeThemes: false,
    includeLanguages: true,
  })

  const steps: ProjectSetupStep[] = [
    {
      id: "project-info",
      title: "Информация о проекте",
      description: "Укажите основную информацию о создаваемом проекте",
      isCompleted: currentStep > 1,
      isActive: currentStep === 1,
    },
    {
      id: "opencart-version",
      title: "Версия OpenCart",
      description: "Выберите версию OpenCart для разработки",
      isCompleted: currentStep > 2,
      isActive: currentStep === 2,
    },
    {
      id: "download-files",
      title: "Загрузка файлов",
      description: "Загрузка необходимых файлов OpenCart",
      isCompleted: currentStep > 3,
      isActive: currentStep === 3,
    },
    {
      id: "indexing",
      title: "Индексация",
      description: "Индексация файлов для AI анализа",
      isCompleted: currentStep > 4,
      isActive: currentStep === 4,
    },
  ]

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleBrowseFolder = () => {
    // В реальном расширении VSCode здесь будет вызов API VSCode для выбора папки
    // Для демонстрации просто установим путь
    setProjectPath("/path/to/projects/my-opencart-extension")
  }

  const handleDownloadFiles = () => {
    setIsDownloading(true)
    setDownloadProgress(0)

    // Симуляция загрузки файлов
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        const newProgress = prev + Math.random() * 5
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsDownloading(false)
          return 100
        }
        return newProgress
      })
    }, 200)
  }

  const handleStartIndexing = () => {
    setIsIndexing(true)
    setIndexingProgress(0)

    // Симуляция индексации файлов
    const interval = setInterval(() => {
      setIndexingProgress((prev) => {
        const newProgress = prev + Math.random() * 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsIndexing(false)
          setSetupCompleted(true)
          return 100
        }
        return newProgress
      })
    }, 300)
  }

  const getProjectTypeLabel = (type: ProjectType): string => {
    const labels: Record<ProjectType, string> = {
      module: "Модуль",
      ocmod: "OCMod модификатор",
      theme: "Тема/Шаблон",
      controller: "Контроллер",
      model: "Модель",
    }
    return labels[type]
  }

  const getVersionLabel = (version: OpenCartVersion): string => {
    const labels: Record<OpenCartVersion, string> = {
      "4.x": "OpenCart 4.x",
      "3.x": "OpenCart 3.x",
      "2.x": "OpenCart 2.x",
    }
    return labels[version]
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Мастер создания проекта OpenCart</CardTitle>
        <CardDescription>
          Создайте структуру проекта и загрузите необходимые файлы OpenCart для разработки
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Прогресс настройки</h3>
            <span className="text-xs text-muted-foreground">
              Шаг {currentStep} из {steps.length}
            </span>
          </div>
          <div className="space-y-3">
            {steps.map((step) => (
              <div key={step.id} className="flex items-start gap-3">
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                    step.isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : step.isActive
                        ? "border-primary text-primary"
                        : "border-muted-foreground/30 text-muted-foreground/30"
                  }`}
                >
                  {step.isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <span className="text-xs">{steps.indexOf(step) + 1}</span>
                  )}
                </div>
                <div>
                  <h4 className={`text-sm font-medium ${step.isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.title}
                  </h4>
                  <p className={`text-xs ${step.isActive ? "text-muted-foreground" : "text-muted-foreground/60"}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Название проекта</Label>
                <Input
                  id="project-name"
                  placeholder="my_awesome_module"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Используйте только латинские буквы, цифры и подчеркивания
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-type">Тип проекта</Label>
                <Select value={projectType} onValueChange={(value) => setProjectType(value as ProjectType)}>
                  <SelectTrigger id="project-type">
                    <SelectValue placeholder="Выберите тип проекта" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="module">Модуль</SelectItem>
                    <SelectItem value="ocmod">OCMod модификатор</SelectItem>
                    <SelectItem value="theme">Тема/Шаблон</SelectItem>
                    <SelectItem value="controller">Контроллер</SelectItem>
                    <SelectItem value="model">Модель</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-path">Путь к проекту</Label>
                <div className="flex gap-2">
                  <Input
                    id="project-path"
                    placeholder="/path/to/project"
                    value={projectPath}
                    onChange={(e) => setProjectPath(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={handleBrowseFolder}>
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Обзор
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="opencart-version">Версия OpenCart</Label>
                <Select value={openCartVersion} onValueChange={(value) => setOpenCartVersion(value as OpenCartVersion)}>
                  <SelectTrigger id="opencart-version">
                    <SelectValue placeholder="Выберите версию OpenCart" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4.x">OpenCart 4.x</SelectItem>
                    <SelectItem value="3.x">OpenCart 3.x</SelectItem>
                    <SelectItem value="2.x">OpenCart 2.x</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Выберите версию OpenCart, для которой разрабатывается ваш проект
                </p>
              </div>

              <div className="space-y-2">
                <Label>Что загрузить</Label>
                <RadioGroup value={downloadOption} onValueChange={setDownloadOption}>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="full" id="full" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="full" className="font-medium">
                        Полная версия OpenCart
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Загрузить полную версию OpenCart для полного доступа ко всем файлам (рекомендуется)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="minimal" id="minimal" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="minimal" className="font-medium">
                        Минимальная версия
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Загрузить только необходимые файлы для разработки выбранного типа проекта
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="none" id="none" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="none" className="font-medium">
                        Не загружать файлы
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Пропустить загрузку файлов (если у вас уже есть установленный OpenCart)
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Загрузка файлов OpenCart {openCartVersion}</h3>
                  {downloadProgress === 100 && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                      Загружено
                    </Badge>
                  )}
                </div>

                {downloadOption !== "none" && (
                  <>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Прогресс загрузки</span>
                        <span>{Math.round(downloadProgress)}%</span>
                      </div>
                      <Progress value={downloadProgress} className="h-2" />
                    </div>

                    {!isDownloading && downloadProgress === 0 && (
                      <div className="flex flex-col items-center justify-center p-8 border rounded-md border-dashed">
                        <FileArchive className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-center text-muted-foreground mb-4">
                          Нажмите кнопку ниже, чтобы начать загрузку файлов OpenCart {openCartVersion}
                        </p>
                        <Button onClick={handleDownloadFiles}>
                          <Download className="h-4 w-4 mr-2" />
                          Начать загрузку
                        </Button>
                      </div>
                    )}

                    {isDownloading && (
                      <Alert>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <AlertTitle>Загрузка файлов</AlertTitle>
                        <AlertDescription>
                          Пожалуйста, подождите, идет загрузка файлов OpenCart {openCartVersion}...
                        </AlertDescription>
                      </Alert>
                    )}

                    {!isDownloading && downloadProgress === 100 && (
                      <Alert className="bg-green-50 border-green-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800">Загрузка завершена</AlertTitle>
                        <AlertDescription className="text-green-700">
                          Файлы OpenCart {openCartVersion} успешно загружены в проект
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                )}

                {downloadOption === "none" && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Загрузка пропущена</AlertTitle>
                    <AlertDescription>
                      Вы выбрали не загружать файлы OpenCart. Убедитесь, что у вас уже есть доступ к необходимым файлам.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Индексация файлов для AI анализа</h3>
                  {indexingProgress === 100 && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                      Завершено
                    </Badge>
                  )}
                </div>

                <div className="space-y-4 border rounded-md p-4">
                  <h4 className="text-sm font-medium">Параметры индексации</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="include-core"
                        checked={indexingOptions.includeCore}
                        onCheckedChange={(checked) =>
                          setIndexingOptions({ ...indexingOptions, includeCore: checked as boolean })
                        }
                      />
                      <Label htmlFor="include-core" className="text-sm">
                        Индексировать ядро OpenCart
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="include-extensions"
                        checked={indexingOptions.includeExtensions}
                        onCheckedChange={(checked) =>
                          setIndexingOptions({ ...indexingOptions, includeExtensions: checked as boolean })
                        }
                      />
                      <Label htmlFor="include-extensions" className="text-sm">
                        Индексировать расширения
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="include-themes"
                        checked={indexingOptions.includeThemes}
                        onCheckedChange={(checked) =>
                          setIndexingOptions({ ...indexingOptions, includeThemes: checked as boolean })
                        }
                      />
                      <Label htmlFor="include-themes" className="text-sm">
                        Индексировать темы
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="include-languages"
                        checked={indexingOptions.includeLanguages}
                        onCheckedChange={(checked) =>
                          setIndexingOptions({ ...indexingOptions, includeLanguages: checked as boolean })
                        }
                      />
                      <Label htmlFor="include-languages" className="text-sm">
                        Индексировать языковые файлы
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Прогресс индексации</span>
                    <span>{Math.round(indexingProgress)}%</span>
                  </div>
                  <Progress value={indexingProgress} className="h-2" />
                </div>

                {!isIndexing && indexingProgress === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 border rounded-md border-dashed">
                    <FolderTree className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-center text-muted-foreground mb-4">
                      Индексация файлов позволит AI агенту анализировать структуру и содержимое файлов OpenCart
                    </p>
                    <Button onClick={handleStartIndexing}>
                      <FolderTree className="h-4 w-4 mr-2" />
                      Начать индексацию
                    </Button>
                  </div>
                )}

                {isIndexing && (
                  <Alert>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <AlertTitle>Индексация файлов</AlertTitle>
                    <AlertDescription>
                      Пожалуйста, подождите, идет индексация файлов OpenCart для AI анализа...
                    </AlertDescription>
                  </Alert>
                )}

                {!isIndexing && indexingProgress === 100 && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-800">Индексация завершена</AlertTitle>
                    <AlertDescription className="text-green-700">
                      Файлы OpenCart успешно проиндексированы. AI агент теперь имеет доступ к структуре и содержимому
                      файлов.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePreviousStep} disabled={currentStep === 1}>
          Назад
        </Button>
        <div>
          {setupCompleted ? (
            <Button variant="default" className="bg-green-600 hover:bg-green-700">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Завершить настройку
            </Button>
          ) : (
            <Button
              onClick={handleNextStep}
              disabled={
                (currentStep === 1 && (!projectName || !projectPath)) ||
                (currentStep === 3 && downloadOption !== "none" && downloadProgress < 100) ||
                (currentStep === 4 && indexingProgress < 100)
              }
            >
              {currentStep === steps.length ? "Завершить" : "Далее"}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
