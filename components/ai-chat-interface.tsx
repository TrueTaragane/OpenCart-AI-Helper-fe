"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Bot, Send, Upload, Code, Save, Copy, Sparkles, FileCode, Settings, RefreshCw, Lightbulb } from "lucide-react"

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

export function AIChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Привет! Я ваш AI-помощник для OpenCart. Опишите, какой модуль, модификатор или шаблон вы хотите создать, и я помогу вам сгенерировать код.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeModel, setActiveModel] = useState("gpt-4o")
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    { id: "1", text: "Создать модуль карусели товаров" },
    { id: "2", text: "Сгенерировать OCMod для изменения страницы товара" },
    { id: "3", text: "Создать контроллер для новой страницы в админке" },
  ])
  const [generatedCode, setGeneratedCode] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
          "Я подготовил код для модуля OpenCart на основе вашего запроса. Вы можете просмотреть его на вкладке 'Код' и внести необходимые изменения.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setGeneratedCode(`<?php
namespace Opencart\\Admin\\Controller\\Extension\\Module;

class CustomModule extends \\Opencart\\System\\Engine\\Controller {
    private $error = array();
    
    public function index() {
        $this->load->language('extension/module/custom_module');
        
        $this->document->setTitle($this->language->get('heading_title'));
        
        $this->load->model('setting/setting');
        
        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
            $this->model_setting_setting->editSetting('module_custom_module', $this->request->post);
            
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
            'href' => $this->url->link('extension/module/custom_module', 'user_token=' . $this->session->data['user_token'])
        ];
        
        // Form action
        $data['action'] = $this->url->link('extension/module/custom_module', 'user_token=' . $this->session->data['user_token']);
        $data['cancel'] = $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=module');
        
        // Module status
        if (isset($this->request->post['module_custom_module_status'])) {
            $data['module_custom_module_status'] = $this->request->post['module_custom_module_status'];
        } else {
            $data['module_custom_module_status'] = $this->config->get('module_custom_module_status');
        }
        
        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');
        
        $this->response->setOutput($this->load->view('extension/module/custom_module', $data));
    }
    
    protected function validate() {
        if (!$this->user->hasPermission('modify', 'extension/module/custom_module')) {
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

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <h2 className="text-lg font-medium">OpenCart AI Помощник</h2>
          <Badge variant="outline" className="ml-2">
            {activeModel}
          </Badge>
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Настройки AI</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Новый чат</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
        <div className="md:col-span-2 flex flex-col">
          <Tabs defaultValue="chat" className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="chat">Чат</TabsTrigger>
              <TabsTrigger value="code">Код</TabsTrigger>
              <TabsTrigger value="preview">Предпросмотр</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 flex flex-col mt-0 data-[state=active]:flex-1">
              <Card className="flex-1 flex flex-col">
                <CardContent className="flex-1 p-4 overflow-hidden">
                  <ScrollArea className="h-full pr-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                          >
                            <Avatar className={message.role === "assistant" ? "bg-primary/10" : "bg-muted"}>
                              <AvatarFallback>{message.role === "assistant" ? "AI" : "Вы"}</AvatarFallback>
                              {message.role === "assistant" && (
                                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                              )}
                            </Avatar>
                            <div
                              className={`rounded-lg p-3 ${
                                message.role === "assistant"
                                  ? "bg-primary/10 text-foreground"
                                  : "bg-primary text-primary-foreground"
                              }`}
                            >
                              <div className="whitespace-pre-wrap">{message.content}</div>
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="code" className="flex-1 flex flex-col mt-0 data-[state=active]:flex-1">
              <Card className="flex-1">
                <CardContent className="p-4 h-full">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <FileCode className="h-4 w-4" />
                      <span className="text-sm font-medium">controller/extension/module/custom_module.php</span>
                    </div>
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
                  <ScrollArea className="h-[calc(100%-40px)] border rounded-md">
                    <pre className="p-4 text-sm font-mono">{generatedCode}</pre>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 flex flex-col mt-0 data-[state=active]:flex-1">
              <Card className="flex-1">
                <CardContent className="p-4 h-full">
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Предпросмотр модуля будет доступен здесь
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-4">
            <div className="relative">
              <Textarea
                placeholder="Опишите, что вы хотите создать..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-[80px] pr-12 resize-none"
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
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => applySuggestion(suggestion.text)}
                  >
                    <Lightbulb className="h-3 w-3 mr-1" />
                    {suggestion.text}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:block">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Модель AI</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      variant={activeModel === "gpt-4o" ? "default" : "outline"}
                      size="sm"
                      className="justify-start"
                      onClick={() => setActiveModel("gpt-4o")}
                    >
                      <Sparkles className="h-3.5 w-3.5 mr-2" />
                      GPT-4o
                    </Button>
                    <Button
                      variant={activeModel === "gpt-3.5-turbo" ? "default" : "outline"}
                      size="sm"
                      className="justify-start"
                      onClick={() => setActiveModel("gpt-3.5-turbo")}
                    >
                      <Bot className="h-3.5 w-3.5 mr-2" />
                      GPT-3.5 Turbo
                    </Button>
                    <Button
                      variant={activeModel === "claude-3" ? "default" : "outline"}
                      size="sm"
                      className="justify-start"
                      onClick={() => setActiveModel("claude-3")}
                    >
                      <Code className="h-3.5 w-3.5 mr-2" />
                      Claude 3
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Тип кода</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Badge variant="outline" className="justify-center py-1">
                      Модуль
                    </Badge>
                    <Badge variant="outline" className="justify-center py-1">
                      Контроллер
                    </Badge>
                    <Badge variant="outline" className="justify-center py-1">
                      Модель
                    </Badge>
                    <Badge variant="outline" className="justify-center py-1">
                      OCMod
                    </Badge>
                    <Badge variant="outline" className="justify-center py-1">
                      Шаблон
                    </Badge>
                    <Badge variant="outline" className="justify-center py-1">
                      Язык
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Версия OpenCart</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      OpenCart 4.x
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      OpenCart 3.x
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      OpenCart 2.x
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Контекст</h3>
                  <div className="text-sm text-muted-foreground">
                    Загрузите файлы проекта, чтобы AI мог лучше понять контекст вашего магазина.
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    <Upload className="h-3.5 w-3.5 mr-2" />
                    Загрузить файлы
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
