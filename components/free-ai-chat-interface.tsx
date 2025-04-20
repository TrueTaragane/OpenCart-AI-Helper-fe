"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Bot,
  Send,
  Upload,
  Save,
  Copy,
  Sparkles,
  FileCode,
  Settings,
  RefreshCw,
  Lightbulb,
  Zap,
  Globe,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
} from "lucide-react"
import { PromptSelector } from "./prompt-collection/prompt-selector"
import type { Prompt, PromptCategory } from "./prompt-collection/prompt-collection-manager"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Suggestion {
  id: string
  text: string
}

export function FreeAIChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Привет! Я ваш AI-помощник для OpenCart, работающий на бесплатных моделях. Опишите, какой модуль, модификатор или шаблон вы хотите создать, и я помогу вам сгенерировать код.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeModel, setActiveModel] = useState("gemini-pro")
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    { id: "1", text: "Создать простой модуль для OpenCart" },
    { id: "2", text: "Сгенерировать OCMod для изменения страницы товара" },
    { id: "3", text: "Создать контроллер для новой страницы в админке" },
  ])
  const [generatedCode, setGeneratedCode] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample categories for prompt selector
  const promptCategories: PromptCategory[] = [
    { id: "module", name: "Модули", color: "bg-blue-500" },
    { id: "ocmod", name: "OCMod", color: "bg-green-500" },
    { id: "theme", name: "Темы", color: "bg-purple-500" },
    { id: "controller", name: "Контроллеры", color: "bg-amber-500" },
    { id: "model", name: "Модели", color: "bg-red-500" },
    { id: "general", name: "Общие", color: "bg-gray-500" },
  ]

  // Sample prompts for prompt selector
  const samplePrompts: Prompt[] = [
    {
      id: "1",
      title: "Базовый модуль OpenCart 4.x",
      description: "Создает базовую структуру модуля для OpenCart 4.x с настройками в админке",
      content: `Создай полный модуль для OpenCart 4.x со следующими характеристиками:

1. Название: "Basic Module"
2. Функциональность: Базовый модуль с настройками в админке
3. Структура файлов:
   - admin/controller/extension/module/basic_module.php
   - admin/language/en-gb/extension/module/basic_module.php
   - admin/view/template/extension/module/basic_module.twig
   - catalog/controller/extension/module/basic_module.php
   - catalog/language/en-gb/extension/module/basic_module.php
   - catalog/view/template/extension/module/basic_module.twig

4. Настройки в админке:
   - Заголовок модуля (текст)
   - Статус модуля (вкл/выкл)

Пожалуйста, создай полный код для всех необходимых файлов, включая комментарии и документацию.`,
      category: "module",
      tags: ["базовый", "opencart 4.x", "модуль"],
      createdAt: new Date("2023-10-15"),
      updatedAt: new Date("2023-10-15"),
      isFavorite: true,
    },
    {
      id: "2",
      title: "OCMod для изменения страницы товара",
      description: "Модификатор для добавления дополнительного поля на страницу товара",
      content: `Создай OCMod модификатор для OpenCart 3.x, который добавляет дополнительное поле на страницу товара. Модификатор должен:

1. Добавить новое поле "Особенности товара" на странице товара под описанием
2. Добавить возможность редактирования этого поля в админке на странице редактирования товара
3. Сохранять значение поля в базе данных
4. Отображать поле на фронтенде в карточке товара

Пожалуйста, создай полный XML-код модификатора с комментариями и инструкцией по установке.`,
      category: "ocmod",
      tags: ["ocmod", "opencart 3.x", "страница товара"],
      createdAt: new Date("2023-09-20"),
      updatedAt: new Date("2023-09-25"),
      isFavorite: false,
    },
    {
      id: "3",
      title: "Контроллер для API",
      description: "Создает контроллер для работы с API в OpenCart",
      content: `Создай контроллер для API в OpenCart 4.x, который будет обрабатывать запросы к товарам. Контроллер должен:

1. Иметь методы для получения списка товаров (GET)
2. Иметь метод для получения информации о конкретном товаре по ID (GET)
3. Иметь метод для добавления нового товара (POST)
4. Иметь метод для обновления существующего товара (PUT)
5. Иметь метод для удаления товара (DELETE)
6. Включать проверку авторизации через API ключ
7. Возвращать данные в формате JSON

Пожалуйста, создай полный код контроллера с комментариями и примерами использования.`,
      category: "controller",
      tags: ["api", "opencart 4.x", "контроллер", "rest"],
      createdAt: new Date("2023-08-10"),
      updatedAt: new Date("2023-08-15"),
      isFavorite: true,
    },
  ]

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsGenerating(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Я подготовил код для простого модуля OpenCart на основе вашего запроса. Вы можете просмотреть его на вкладке 'Код' и внести необходимые изменения.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setGeneratedCode(`<?php
namespace Opencart\\Admin\\Controller\\Extension\\Module;

class SimpleModule extends \\Opencart\\System\\Engine\\Controller {
    private $error = array();
    
    public function index() {
        $this->load->language('extension/module/simple_module');
        
        $this->document->setTitle($this->language->get('heading_title'));
        
        $this->load->model('setting/setting');
        
        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
            $this->model_setting_setting->editSetting('module_simple_module', $this->request->post);
            
            $this->session->data['success'] = $this->language->get('text_success');
            
            $this->response->redirect($this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=module'));
        }
        
        // Form fields and validation logic
        $data['heading_title'] = $this->language->get('heading_title');
        
        // Breadcrumbs
        $data['breadcrumbs'] = [];
        
        $data['breadcrumbs'][] = [
            'text' => $this->language->get('text_home'),
            'href' => $this->url->link('common/dashboard', 'user_token=' . $this->session->data['user_token'])
        ];
        
        $data['breadcrumbs'][] = [
            'text' => $this->language->get('text_extension'),
            'href' => $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=module')
        ];
        
        $data['breadcrumbs'][] = [
            'text' => $this->language->get('heading_title'),
            'href' => $this->url->link('extension/module/simple_module', 'user_token=' . $this->session->data['user_token'])
        ];
        
        // Form action
        $data['action'] = $this->url->link('extension/module/simple_module', 'user_token=' . $this->session->data['user_token']);
        $data['cancel'] = $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=module');
        
        // Module status
        if (isset($this->request->post['module_simple_module_status'])) {
            $data['module_simple_module_status'] = $this->request->post['module_simple_module_status'];
        } else {
            $data['module_simple_module_status'] = $this->config->get('module_simple_module_status');
        }
        
        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');
        
        $this->response->setOutput($this->load->view('extension/module/simple_module', $data));
    }
    
    protected function validate() {
        if (!$this->user->hasPermission('modify', 'extension/module/simple_module')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }
        
        return !$this->error;
    }
}`)
      setIsGenerating(false)
    }, 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const applySuggestion = (suggestion: string) => {
    setInput(suggestion)
  }

  const handleSelectPrompt = (prompt: Prompt) => {
    setInput(prompt.content)
  }

  const getModelIcon = () => {
    switch (activeModel) {
      case "gemini-pro":
        return <Sparkles className="h-4 w-4" />
      case "mistral-small":
        return <Zap className="h-4 w-4" />
      case "openrouter-llama3":
        return <Globe className="h-4 w-4" />
      default:
        return <Bot className="h-4 w-4" />
    }
  }

  return (
    <div className={cn("flex h-full", fullscreen ? "fixed inset-0 z-50 bg-background" : "")}>
      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b h-10">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span className="text-sm font-medium">OpenCart AI Chat</span>
            <Badge variant="outline" className="ml-1 flex items-center gap-1 h-5 text-xs">
              {getModelIcon()}
              <span>{activeModel}</span>
            </Badge>
          </div>
          <div className="flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{sidebarOpen ? "Hide sidebar" : "Show sidebar"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setFullscreen(!fullscreen)}>
                    {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{fullscreen ? "Exit fullscreen" : "Fullscreen"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <PromptSelector prompts={samplePrompts} categories={promptCategories} onSelectPrompt={handleSelectPrompt} />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>New chat</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Chat content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs defaultValue="chat" className="flex-1 flex flex-col">
            <TabsList className="px-4 pt-2 pb-0 h-9 justify-start border-b rounded-none gap-2">
              <TabsTrigger value="chat" className="h-7 text-xs">
                Chat
              </TabsTrigger>
              <TabsTrigger value="code" className="h-7 text-xs">
                Code
              </TabsTrigger>
              <TabsTrigger value="preview" className="h-7 text-xs">
                Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 flex flex-col p-0 data-[state=active]:flex-1">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                        <Avatar className={`h-8 w-8 ${message.role === "assistant" ? "bg-primary/10" : "bg-muted"}`}>
                          <AvatarFallback className="text-xs">
                            {message.role === "assistant" ? "AI" : "You"}
                          </AvatarFallback>
                          {message.role === "assistant" && <AvatarImage src="/placeholder.svg?height=32&width=32" />}
                        </Avatar>
                        <div
                          className={`rounded-lg p-3 ${
                            message.role === "assistant"
                              ? "bg-primary/10 text-foreground"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                          <div
                            className={`text-xs mt-1 ${
                              message.role === "assistant" ? "text-muted-foreground" : "text-primary-foreground/80"
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <div className="p-4 pt-2">
                <div className="relative">
                  <Textarea
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-[60px] pr-12 resize-none text-sm"
                  />
                  <div className="absolute right-2 bottom-2 flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Upload className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isGenerating}
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {!input && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {suggestions.map((suggestion) => (
                      <Badge
                        key={suggestion.id}
                        variant="outline"
                        className="cursor-pointer hover:bg-muted text-xs"
                        onClick={() => applySuggestion(suggestion.text)}
                      >
                        <Lightbulb className="h-3 w-3 mr-1" />
                        {suggestion.text}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="code" className="flex-1 flex flex-col p-0 data-[state=active]:flex-1">
              <div className="flex-1 p-4 overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <FileCode className="h-4 w-4" />
                    <span className="text-xs font-medium">controller/extension/module/simple_module.php</span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      Copy
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      <Save className="h-3.5 w-3.5 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>
                <ScrollArea className="flex-1 border rounded-md">
                  <pre className="p-4 text-xs font-mono">{generatedCode}</pre>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 flex flex-col p-0 data-[state=active]:flex-1">
              <div className="flex-1 p-4 overflow-hidden flex flex-col">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Module preview will be available here
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 border-l bg-muted/30 flex flex-col">
          <div className="p-3 border-b">
            <h3 className="text-xs font-medium">Configuration</h3>
          </div>
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-medium mb-2">AI Model</h4>
                <div className="grid grid-cols-1 gap-1.5">
                  <Button
                    variant={activeModel === "gemini-pro" ? "default" : "outline"}
                    size="sm"
                    className="justify-start h-7 text-xs"
                    onClick={() => setActiveModel("gemini-pro")}
                  >
                    <Sparkles className="h-3 w-3 mr-1.5" />
                    Gemini Pro
                  </Button>
                  <Button
                    variant={activeModel === "mistral-small" ? "default" : "outline"}
                    size="sm"
                    className="justify-start h-7 text-xs"
                    onClick={() => setActiveModel("mistral-small")}
                  >
                    <Zap className="h-3 w-3 mr-1.5" />
                    Mistral Small
                  </Button>
                  <Button
                    variant={activeModel === "openrouter-llama3" ? "default" : "outline"}
                    size="sm"
                    className="justify-start h-7 text-xs"
                    onClick={() => setActiveModel("openrouter-llama3")}
                  >
                    <Globe className="h-3 w-3 mr-1.5" />
                    Llama 3 (OpenRouter)
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium mb-2">Code Type</h4>
                <div className="grid grid-cols-2 gap-1.5">
                  <Badge variant="outline" className="justify-center py-0.5 text-xs">
                    Module
                  </Badge>
                  <Badge variant="outline" className="justify-center py-0.5 text-xs">
                    Controller
                  </Badge>
                  <Badge variant="outline" className="justify-center py-0.5 text-xs">
                    Model
                  </Badge>
                  <Badge variant="outline" className="justify-center py-0.5 text-xs">
                    OCMod
                  </Badge>
                  <Badge variant="outline" className="justify-center py-0.5 text-xs">
                    Template
                  </Badge>
                  <Badge variant="outline" className="justify-center py-0.5 text-xs">
                    Language
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium mb-2">OpenCart Version</h4>
                <div className="grid grid-cols-1 gap-1.5">
                  <Button variant="outline" size="sm" className="justify-start h-7 text-xs">
                    OpenCart 4.x
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start h-7 text-xs">
                    OpenCart 3.x
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start h-7 text-xs">
                    OpenCart 2.x
                  </Button>
                </div>
              </div>

              <div className="rounded-md border p-2 bg-amber-50 border-amber-200">
                <h4 className="text-xs font-medium mb-1 flex items-center gap-1 text-amber-700">
                  <Lightbulb className="h-3 w-3" />
                  Tip
                </h4>
                <p className="text-xs text-amber-700">
                  Use the prompt collection for quick access to frequently used prompt templates.
                </p>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
