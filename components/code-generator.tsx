"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, Copy, Download } from "lucide-react"

export function CodeGenerator() {
  const [prompt, setPrompt] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      setGeneratedCode(`<?php
namespace Opencart\\Admin\\Controller\\Extension\\Module;

class CustomModule extends \\Opencart\\System\\Engine\\Controller {
    public function index() {
        $this->load->language('extension/module/custom_module');
        
        $this->document->setTitle($this->language->get('heading_title'));
        
        $data['breadcrumbs'] = [];
        
        $data['breadcrumbs'][] = [
            'text' => $this->language->get('text_home'),
            'href' => $this->url->link('common/dashboard', 'user_token=' . $this->session->data['user_token'])
        ];
        
        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');
        
        $this->response->setOutput($this->load->view('extension/module/custom_module', $data));
    }
}`)
      setIsGenerating(false)
    }, 2000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate OpenCart Code</CardTitle>
          <CardDescription>Describe what you want to create and the AI will generate the code for you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Select defaultValue="module">
              <SelectTrigger>
                <SelectValue placeholder="Select code type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="module">Module</SelectItem>
                <SelectItem value="controller">Controller</SelectItem>
                <SelectItem value="model">Model</SelectItem>
                <SelectItem value="ocmod">OCMod Modifier</SelectItem>
                <SelectItem value="template">Template</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Describe what you want to create... (e.g., 'Create a product carousel module with custom settings')"
              className="min-h-[200px]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className="w-full">
            {isGenerating ? (
              <>Generating...</>
            ) : (
              <>
                <Bot className="mr-2 h-4 w-4" />
                Generate Code
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Code</CardTitle>
          <CardDescription>Review and copy the generated OpenCart code</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="code">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="code" className="mt-4">
              <div className="relative">
                <Textarea value={generatedCode} readOnly className="font-mono text-sm min-h-[300px] bg-muted" />
                {generatedCode && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button size="icon" variant="ghost" onClick={handleCopy}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="preview" className="mt-4">
              <div className="border rounded-md p-4 min-h-[300px] bg-muted">
                {generatedCode ? (
                  <pre className="text-xs overflow-auto">{generatedCode}</pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Generate code to see preview
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
