"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download, CheckCircle2, AlertCircle, Trash2, HardDrive, Clock, Info } from "lucide-react"

interface OpenCartVersion {
  id: string
  version: string
  releaseDate: string
  size: string
  status: "installed" | "not_installed" | "downloading"
  downloadProgress?: number
  isDefault?: boolean
}

export function OpenCartVersionManager() {
  const [activeTab, setActiveTab] = useState("installed")
  const [installedVersions, setInstalledVersions] = useState<OpenCartVersion[]>([
    {
      id: "4.0.2.3",
      version: "OpenCart 4.0.2.3",
      releaseDate: "2023-10-15",
      size: "32.4 МБ",
      status: "installed",
      isDefault: true,
    },
    {
      id: "3.0.3.8",
      version: "OpenCart 3.0.3.8",
      releaseDate: "2022-02-10",
      size: "28.7 МБ",
      status: "installed",
    },
  ])

  const [availableVersions, setAvailableVersions] = useState<OpenCartVersion[]>([
    {
      id: "4.0.2.3",
      version: "OpenCart 4.0.2.3",
      releaseDate: "2023-10-15",
      size: "32.4 МБ",
      status: "installed",
    },
    {
      id: "4.0.2.2",
      version: "OpenCart 4.0.2.2",
      releaseDate: "2023-08-20",
      size: "32.2 МБ",
      status: "not_installed",
    },
    {
      id: "4.0.2.1",
      version: "OpenCart 4.0.2.1",
      releaseDate: "2023-06-05",
      size: "32.1 МБ",
      status: "not_installed",
    },
    {
      id: "4.0.2.0",
      version: "OpenCart 4.0.2.0",
      releaseDate: "2023-04-12",
      size: "32.0 МБ",
      status: "not_installed",
    },
    {
      id: "3.0.3.8",
      version: "OpenCart 3.0.3.8",
      releaseDate: "2022-02-10",
      size: "28.7 МБ",
      status: "installed",
    },
    {
      id: "3.0.3.7",
      version: "OpenCart 3.0.3.7",
      releaseDate: "2021-07-01",
      size: "28.5 МБ",
      status: "not_installed",
    },
    {
      id: "2.3.0.2",
      version: "OpenCart 2.3.0.2",
      releaseDate: "2016-07-12",
      size: "24.2 МБ",
      status: "not_installed",
    },
  ])

  const downloadVersion = (versionId: string) => {
    setAvailableVersions((prev) =>
      prev.map((version) => {
        if (version.id === versionId) {
          return {
            ...version,
            status: "downloading",
            downloadProgress: 0,
          }
        }
        return version
      }),
    )

    // Simulate download progress
    const interval = setInterval(() => {
      setAvailableVersions((prev) =>
        prev.map((version) => {
          if (version.id === versionId && version.status === "downloading") {
            const newProgress = (version.downloadProgress || 0) + Math.random() * 10
            if (newProgress >= 100) {
              clearInterval(interval)
              return {
                ...version,
                status: "installed",
                downloadProgress: 100,
              }
            }
            return {
              ...version,
              downloadProgress: newProgress,
            }
          }
          return version
        }),
      )
    }, 200)

    // Add to installed versions after download completes
    setTimeout(() => {
      const downloadedVersion = availableVersions.find((v) => v.id === versionId)
      if (downloadedVersion && !installedVersions.some((v) => v.id === versionId)) {
        setInstalledVersions((prev) => [
          ...prev,
          {
            ...downloadedVersion,
            status: "installed",
          },
        ])
      }
    }, 5000)
  }

  const removeVersion = (versionId: string) => {
    setInstalledVersions((prev) => prev.filter((version) => version.id !== versionId))
    setAvailableVersions((prev) =>
      prev.map((version) => {
        if (version.id === versionId) {
          return {
            ...version,
            status: "not_installed",
          }
        }
        return version
      }),
    )
  }

  const setDefaultVersion = (versionId: string) => {
    setInstalledVersions((prev) =>
      prev.map((version) => ({
        ...version,
        isDefault: version.id === versionId,
      })),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Управление версиями OpenCart</CardTitle>
        <CardDescription>
          Загрузите и управляйте различными версиями OpenCart для разработки и тестирования
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="installed" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="installed">Установленные</TabsTrigger>
            <TabsTrigger value="available">Доступные</TabsTrigger>
          </TabsList>
          <TabsContent value="installed" className="space-y-4 pt-4">
            {installedVersions.length > 0 ? (
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {installedVersions.map((version) => (
                    <div
                      key={version.id}
                      className="border rounded-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{version.version}</h3>
                          {version.isDefault && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">По умолчанию</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{version.releaseDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <HardDrive className="h-3.5 w-3.5" />
                            <span>{version.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 self-end sm:self-center">
                        {!version.isDefault && (
                          <Button variant="outline" size="sm" onClick={() => setDefaultVersion(version.id)}>
                            Использовать по умолчанию
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => removeVersion(version.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 border rounded-md border-dashed">
                <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-center text-muted-foreground mb-4">
                  У вас нет установленных версий OpenCart
                </p>
                <Button onClick={() => setActiveTab("available")}>Просмотреть доступные версии</Button>
              </div>
            )}

            {installedVersions.length > 0 && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Информация</AlertTitle>
                <AlertDescription>
                  Установленные версии OpenCart доступны для индексации и использования в проектах. Версия по умолчанию
                  будет использоваться при создании новых проектов.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
          <TabsContent value="available" className="space-y-4 pt-4">
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {availableVersions.map((version) => (
                  <div
                    key={version.id}
                    className="border rounded-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <h3 className="font-medium">{version.version}</h3>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{version.releaseDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <HardDrive className="h-3.5 w-3.5" />
                          <span>{version.size}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {version.status === "not_installed" && (
                        <Button size="sm" onClick={() => downloadVersion(version.id)}>
                          <Download className="h-4 w-4 mr-2" />
                          Загрузить
                        </Button>
                      )}
                      {version.status === "downloading" && (
                        <div className="space-y-2 w-40">
                          <div className="flex justify-between text-xs">
                            <span>Загрузка...</span>
                            <span>{Math.round(version.downloadProgress || 0)}%</span>
                          </div>
                          <Progress value={version.downloadProgress} className="h-2" />
                        </div>
                      )}
                      {version.status === "installed" && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          Установлено
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
