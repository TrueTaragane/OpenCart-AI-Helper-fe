import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FreeAIChatInterface } from "@/components/free-ai-chat-interface"
import { FreeModelSelector } from "@/components/free-model-selector"
import { PromptEngineering } from "@/components/prompt-engineering"
import { LocalModelSetup } from "@/components/local-model-setup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderPlus, FileArchive, FolderTree, FileText } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">OpenCart AI Helper</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Создать проект</CardTitle>
            <CardDescription>Создайте новый проект OpenCart с нужной структурой</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <FolderPlus className="h-20 w-20 text-primary/20" />
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/project-setup" className="w-full">
              <Button className="w-full">Создать проект</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Управление версиями</CardTitle>
            <CardDescription>Загрузите и управляйте версиями OpenCart</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <FileArchive className="h-20 w-20 text-primary/20" />
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/version-manager" className="w-full">
              <Button className="w-full">Управление версиями</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Проводник файлов</CardTitle>
            <CardDescription>Просматривайте и анализируйте файлы OpenCart</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <FolderTree className="h-20 w-20 text-primary/20" />
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/file-explorer" className="w-full">
              <Button className="w-full">Открыть проводник</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Коллекция промптов</CardTitle>
            <CardDescription>Управляйте и используйте эффективные промпты</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <FileText className="h-20 w-20 text-primary/20" />
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/prompt-collection" className="w-full">
              <Button className="w-full">Открыть коллекцию</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">AI Чат</TabsTrigger>
          <TabsTrigger value="models">Модели</TabsTrigger>
          <TabsTrigger value="prompts">Промпты</TabsTrigger>
          <TabsTrigger value="local">Локальные модели</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <FreeAIChatInterface />
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <FreeModelSelector />
        </TabsContent>

        <TabsContent value="prompts" className="space-y-4">
          <PromptEngineering />
        </TabsContent>

        <TabsContent value="local" className="space-y-4">
          <LocalModelSetup />
        </TabsContent>
      </Tabs>
    </div>
  )
}
