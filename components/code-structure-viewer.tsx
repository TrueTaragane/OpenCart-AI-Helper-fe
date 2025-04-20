"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronDown, Folder, FileText, Code, RefreshCw, Download } from "lucide-react"

interface FileNode {
  id: string
  name: string
  type: "file" | "folder"
  children?: FileNode[]
  content?: string
}

export function CodeStructureViewer() {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    root: true,
    admin: true,
    catalog: true,
  })
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)
  const [fileStructure, setFileStructure] = useState<FileNode>({
    id: "root",
    name: "custom_module",
    type: "folder",
    children: [
      {
        id: "admin",
        name: "admin",
        type: "folder",
        children: [
          {
            id: "controller",
            name: "controller",
            type: "folder",
            children: [
              {
                id: "extension",
                name: "extension",
                type: "folder",
                children: [
                  {
                    id: "module",
                    name: "module",
                    type: "folder",
                    children: [
                      {
                        id: "custom_module.php",
                        name: "custom_module.php",
                        type: "file",
                        content: `<?php
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
}`,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "language",
            name: "language",
            type: "folder",
            children: [
              {
                id: "en-gb",
                name: "en-gb",
                type: "folder",
                children: [
                  {
                    id: "extension",
                    name: "extension",
                    type: "folder",
                    children: [
                      {
                        id: "module",
                        name: "module",
                        type: "folder",
                        children: [
                          {
                            id: "custom_module.php",
                            name: "custom_module.php",
                            type: "file",
                            content: `<?php
// Heading
$_['heading_title']    = 'Custom Module';

// Text
$_['text_extension']   = 'Extensions';
$_['text_success']     = 'Success: You have modified custom module!';
$_['text_edit']        = 'Edit Custom Module';

// Entry
$_['entry_status']     = 'Status';

// Error
$_['error_permission'] = 'Warning: You do not have permission to modify custom module!';`,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "view",
            name: "view",
            type: "folder",
            children: [
              {
                id: "template",
                name: "template",
                type: "folder",
                children: [
                  {
                    id: "extension",
                    name: "extension",
                    type: "folder",
                    children: [
                      {
                        id: "module",
                        name: "module",
                        type: "folder",
                        children: [
                          {
                            id: "custom_module.twig",
                            name: "custom_module.twig",
                            type: "file",
                            content: `{{ header }}{{ column_left }}
<div id="content">
  <div class="page-header">
    <div class="container-fluid">
      <div class="float-end">
        <button type="submit" form="form-module" data-bs-toggle="tooltip" title="{{ button_save }}" class="btn btn-primary"><i class="fa-solid fa-save"></i></button>
        <a href="{{ cancel }}" data-bs-toggle="tooltip" title="{{ button_cancel }}" class="btn btn-light"><i class="fa-solid fa-reply"></i></a>
      </div>
      <h1>{{ heading_title }}</h1>
      <ol class="breadcrumb">
        {% for breadcrumb in breadcrumbs %}
          <li class="breadcrumb-item"><a href="{{ breadcrumb.href }}">{{ breadcrumb.text }}</a></li>
        {% endfor %}
      </ol>
    </div>
  </div>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header"><i class="fa-solid fa-pencil"></i> {{ text_edit }}</div>
      <div class="card-body">
        <form id="form-module" action="{{ action }}" method="post" data-oc-toggle="ajax">
          <div class="row mb-3">
            <label class="col-sm-2 col-form-label">{{ entry_status }}</label>
            <div class="col-sm-10">
              <div class="form-check form-switch form-switch-lg">
                <input type="hidden" name="module_custom_module_status" value="0"/>
                <input type="checkbox" name="module_custom_module_status" value="1" id="input-status" class="form-check-input"{% if module_custom_module_status %} checked{% endif %}/>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
{{ footer }}`,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "catalog",
        name: "catalog",
        type: "folder",
        children: [
          {
            id: "controller",
            name: "controller",
            type: "folder",
            children: [
              {
                id: "extension",
                name: "extension",
                type: "folder",
                children: [
                  {
                    id: "module",
                    name: "module",
                    type: "folder",
                    children: [
                      {
                        id: "custom_module.php",
                        name: "custom_module.php",
                        type: "file",
                        content: `<?php
namespace Opencart\\Catalog\\Controller\\Extension\\Module;

class CustomModule extends \\Opencart\\System\\Engine\\Controller {
    public function index() {
        $this->load->language('extension/module/custom_module');
        
        $data['heading_title'] = $this->language->get('heading_title');
        
        return $this->load->view('extension/module/custom_module', $data);
    }
}`,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "language",
            name: "language",
            type: "folder",
            children: [
              {
                id: "en-gb",
                name: "en-gb",
                type: "folder",
                children: [
                  {
                    id: "extension",
                    name: "extension",
                    type: "folder",
                    children: [
                      {
                        id: "module",
                        name: "module",
                        type: "folder",
                        children: [
                          {
                            id: "custom_module.php",
                            name: "custom_module.php",
                            type: "file",
                            content: `<?php
// Heading
$_['heading_title'] = 'Custom Module';

// Text
$_['text_module'] = 'Modules';`,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "view",
            name: "view",
            type: "folder",
            children: [
              {
                id: "template",
                name: "template",
                type: "folder",
                children: [
                  {
                    id: "extension",
                    name: "extension",
                    type: "folder",
                    children: [
                      {
                        id: "module",
                        name: "module",
                        type: "folder",
                        children: [
                          {
                            id: "custom_module.twig",
                            name: "custom_module.twig",
                            type: "file",
                            content: `<div class="card">
  <div class="card-header">
    <h3>{{ heading_title }}</h3>
  </div>
  <div class="card-body">
    <p>This is a custom module for OpenCart.</p>
  </div>
</div>`,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  })

  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const selectFile = (file: FileNode) => {
    setSelectedFile(file)
  }

  const renderFileTree = (node: FileNode, level = 0) => {
    const isExpanded = expandedFolders[node.id]

    return (
      <div key={node.id} style={{ paddingLeft: `${level * 16}px` }}>
        <div
          className={`flex items-center py-1 px-2 rounded-md hover:bg-muted cursor-pointer ${
            selectedFile?.id === node.id ? "bg-muted" : ""
          }`}
          onClick={() => {
            if (node.type === "folder") {
              toggleFolder(node.id)
            } else {
              selectFile(node)
            }
          }}
        >
          {node.type === "folder" ? (
            <>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 mr-1 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1 text-muted-foreground" />
              )}
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
            </>
          ) : (
            <>
              <span className="w-4 mr-1" />
              <FileText className="h-4 w-4 mr-2 text-gray-500" />
            </>
          )}
          <span className="text-sm">{node.name}</span>
        </div>

        {node.type === "folder" && isExpanded && node.children && (
          <div>{node.children.map((child) => renderFileTree(child, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
      <Card className="md:col-span-1">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">Структура файлов</CardTitle>
            <Button variant="ghost" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <ScrollArea className="h-[520px] pr-4">{renderFileTree(fileStructure)}</ScrollArea>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">{selectedFile ? selectedFile.name : "Предпросмотр файла"}</CardTitle>
            {selectedFile && (
              <div className="flex gap-1">
                <Button variant="ghost" size="icon">
                  <Code className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <ScrollArea className="h-[520px] border rounded-md">
            {selectedFile ? (
              <pre className="p-4 text-sm font-mono">{selectedFile.content}</pre>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Выберите файл для просмотра
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
