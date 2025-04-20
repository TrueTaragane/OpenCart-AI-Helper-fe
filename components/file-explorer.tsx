"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FileText,
  Search,
  RefreshCw,
  Eye,
  Copy,
  FileCode,
  FolderOpen,
  AlertCircle,
  Info,
} from "lucide-react"

interface FileNode {
  id: string
  name: string
  type: "file" | "folder"
  path: string
  children?: FileNode[]
  content?: string
  isOpenCart?: boolean
}

export function FileExplorer() {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    root: true,
    "root/admin": true,
    "root/catalog": true,
  })
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("project")
  const [isIndexed, setIsIndexed] = useState(true)
  const [fileStructure, setFileStructure] = useState<FileNode>({
    id: "root",
    name: "my_awesome_module",
    type: "folder",
    path: "/path/to/projects/my_awesome_module",
    children: [
      {
        id: "root/admin",
        name: "admin",
        type: "folder",
        path: "/path/to/projects/my_awesome_module/admin",
        children: [
          {
            id: "root/admin/controller",
            name: "controller",
            type: "folder",
            path: "/path/to/projects/my_awesome_module/admin/controller",
            children: [
              {
                id: "root/admin/controller/extension",
                name: "extension",
                type: "folder",
                path: "/path/to/projects/my_awesome_module/admin/controller/extension",
                children: [
                  {
                    id: "root/admin/controller/extension/module",
                    name: "module",
                    type: "folder",
                    path: "/path/to/projects/my_awesome_module/admin/controller/extension/module",
                    children: [
                      {
                        id: "root/admin/controller/extension/module/my_awesome_module.php",
                        name: "my_awesome_module.php",
                        type: "file",
                        path: "/path/to/projects/my_awesome_module/admin/controller/extension/module/my_awesome_module.php",
                        content: `<?php
namespace Opencart\\Admin\\Controller\\Extension\\Module;

class MyAwesomeModule extends \\Opencart\\System\\Engine\\Controller {
    private $error = array();
    
    public function index() {
        $this->load->language('extension/module/my_awesome_module');
        
        $this->document->setTitle($this->language->get('heading_title'));
        
        $this->load->model('setting/setting');
        
        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
            $this->model_setting_setting->editSetting('module_my_awesome_module', $this->request->post);
            
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
            'href' => $this->url->link('extension/module/my_awesome_module', 'user_token=' . $this->session->data['user_token'])
        ];
        
        // Form action
        $data['action'] = $this->url->link('extension/module/my_awesome_module', 'user_token=' . $this->session->data['user_token']);
        $data['cancel'] = $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=module');
        
        // Module status
        if (isset($this->request->post['module_my_awesome_module_status'])) {
            $data['module_my_awesome_module_status'] = $this->request->post['module_my_awesome_module_status'];
        } else {
            $data['module_my_awesome_module_status'] = $this->config->get('module_my_awesome_module_status');
        }
        
        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');
        
        $this->response->setOutput($this->load->view('extension/module/my_awesome_module', $data));
    }
    
    protected function validate() {
        if (!$this->user->hasPermission('modify', 'extension/module/my_awesome_module')) {
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
            id: "root/admin/language",
            name: "language",
            type: "folder",
            path: "/path/to/projects/my_awesome_module/admin/language",
            children: [
              {
                id: "root/admin/language/en-gb",
                name: "en-gb",
                type: "folder",
                path: "/path/to/projects/my_awesome_module/admin/language/en-gb",
                children: [
                  {
                    id: "root/admin/language/en-gb/extension",
                    name: "extension",
                    type: "folder",
                    path: "/path/to/projects/my_awesome_module/admin/language/en-gb/extension",
                    children: [
                      {
                        id: "root/admin/language/en-gb/extension/module",
                        name: "module",
                        type: "folder",
                        path: "/path/to/projects/my_awesome_module/admin/language/en-gb/extension/module",
                        children: [
                          {
                            id: "root/admin/language/en-gb/extension/module/my_awesome_module.php",
                            name: "my_awesome_module.php",
                            type: "file",
                            path: "/path/to/projects/my_awesome_module/admin/language/en-gb/extension/module/my_awesome_module.php",
                            content: `<?php
// Heading
$_['heading_title']    = 'My Awesome Module';

// Text
$_['text_extension']   = 'Extensions';
$_['text_success']     = 'Success: You have modified My Awesome Module!';
$_['text_edit']        = 'Edit My Awesome Module';

// Entry
$_['entry_status']     = 'Status';

// Error
$_['error_permission'] = 'Warning: You do not have permission to modify My Awesome Module!';`,
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
            id: "root/admin/view",
            name: "view",
            type: "folder",
            path: "/path/to/projects/my_awesome_module/admin/view",
            children: [
              {
                id: "root/admin/view/template",
                name: "template",
                type: "folder",
                path: "/path/to/projects/my_awesome_module/admin/view/template",
                children: [
                  {
                    id: "root/admin/view/template/extension",
                    name: "extension",
                    type: "folder",
                    path: "/path/to/projects/my_awesome_module/admin/view/template/extension",
                    children: [
                      {
                        id: "root/admin/view/template/extension/module",
                        name: "module",
                        type: "folder",
                        path: "/path/to/projects/my_awesome_module/admin/view/template/extension/module",
                        children: [
                          {
                            id: "root/admin/view/template/extension/module/my_awesome_module.twig",
                            name: "my_awesome_module.twig",
                            type: "file",
                            path: "/path/to/projects/my_awesome_module/admin/view/template/extension/module/my_awesome_module.twig",
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
                <input type="hidden" name="module_my_awesome_module_status" value="0"/>
                <input type="checkbox" name="module_my_awesome_module_status" value="1" id="input-status" class="form-check-input"{% if module_my_awesome_module_status %} checked{% endif %}/>
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
        id: "root/catalog",
        name: "catalog",
        type: "folder",
        path: "/path/to/projects/my_awesome_module/catalog",
        children: [
          {
            id: "root/catalog/controller",
            name: "controller",
            type: "folder",
            path: "/path/to/projects/my_awesome_module/catalog/controller",
            children: [
              {
                id: "root/catalog/controller/extension",
                name: "extension",
                type: "folder",
                path: "/path/to/projects/my_awesome_module/catalog/controller/extension",
                children: [
                  {
                    id: "root/catalog/controller/extension/module",
                    name: "module",
                    type: "folder",
                    path: "/path/to/projects/my_awesome_module/catalog/controller/extension/module",
                    children: [
                      {
                        id: "root/catalog/controller/extension/module/my_awesome_module.php",
                        name: "my_awesome_module.php",
                        type: "file",
                        path: "/path/to/projects/my_awesome_module/catalog/controller/extension/module/my_awesome_module.php",
                        content: `<?php
namespace Opencart\\Catalog\\Controller\\Extension\\Module;

class MyAwesomeModule extends \\Opencart\\System\\Engine\\Controller {
    public function index() {
        $this->load->language('extension/module/my_awesome_module');
        
        $data['heading_title'] = $this->language->get('heading_title');
        
        return $this->load->view('extension/module/my_awesome_module', $data);
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
            id: "root/catalog/language",
            name: "language",
            type: "folder",
            path: "/path/to/projects/my_awesome_module/catalog/language",
            children: [
              {
                id: "root/catalog/language/en-gb",
                name: "en-gb",
                type: "folder",
                path: "/path/to/projects/my_awesome_module/catalog/language/en-gb",
                children: [
                  {
                    id: "root/catalog/language/en-gb/extension",
                    name: "extension",
                    type: "folder",
                    path: "/path/to/projects/my_awesome_module/catalog/language/en-gb/extension",
                    children: [
                      {
                        id: "root/catalog/language/en-gb/extension/module",
                        name: "module",
                        type: "folder",
                        path: "/path/to/projects/my_awesome_module/catalog/language/en-gb/extension/module",
                        children: [
                          {
                            id: "root/catalog/language/en-gb/extension/module/my_awesome_module.php",
                            name: "my_awesome_module.php",
                            type: "file",
                            path: "/path/to/projects/my_awesome_module/catalog/language/en-gb/extension/module/my_awesome_module.php",
                            content: `<?php
// Heading
$_['heading_title'] = 'My Awesome Module';

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
            id: "root/catalog/view",
            name: "view",
            type: "folder",
            path: "/path/to/projects/my_awesome_module/catalog/view",
            children: [
              {
                id: "root/catalog/view/template",
                name: "template",
                type: "folder",
                path: "/path/to/projects/my_awesome_module/catalog/view/template",
                children: [
                  {
                    id: "root/catalog/view/template/extension",
                    name: "extension",
                    type: "folder",
                    path: "/path/to/projects/my_awesome_module/catalog/view/template/extension",
                    children: [
                      {
                        id: "root/catalog/view/template/extension/module",
                        name: "module",
                        type: "folder",
                        path: "/path/to/projects/my_awesome_module/catalog/view/template/extension/module",
                        children: [
                          {
                            id: "root/catalog/view/template/extension/module/my_awesome_module.twig",
                            name: "my_awesome_module.twig",
                            type: "file",
                            path: "/path/to/projects/my_awesome_module/catalog/view/template/extension/module/my_awesome_module.twig",
                            content: `<div class="card">
  <div class="card-header">
    <h3>{{ heading_title }}</h3>
  </div>
  <div class="card-body">
    <p>This is my awesome module for OpenCart.</p>
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

  const [openCartFiles, setOpenCartFiles] = useState<FileNode>({
    id: "opencart",
    name: "OpenCart 4.x",
    type: "folder",
    path: "/path/to/opencart",
    isOpenCart: true,
    children: [
      {
        id: "opencart/admin",
        name: "admin",
        type: "folder",
        path: "/path/to/opencart/admin",
        isOpenCart: true,
        children: [
          {
            id: "opencart/admin/controller",
            name: "controller",
            type: "folder",
            path: "/path/to/opencart/admin/controller",
            isOpenCart: true,
            children: [
              {
                id: "opencart/admin/controller/extension",
                name: "extension",
                type: "folder",
                path: "/path/to/opencart/admin/controller/extension",
                isOpenCart: true,
                children: [
                  {
                    id: "opencart/admin/controller/extension/module",
                    name: "module",
                    type: "folder",
                    path: "/path/to/opencart/admin/controller/extension/module",
                    isOpenCart: true,
                    children: [
                      {
                        id: "opencart/admin/controller/extension/module/featured.php",
                        name: "featured.php",
                        type: "file",
                        path: "/path/to/opencart/admin/controller/extension/module/featured.php",
                        isOpenCart: true,
                        content: `<?php
namespace Opencart\\Admin\\Controller\\Extension\\Module;

class Featured extends \\Opencart\\System\\Engine\\Controller {
    private $error = array();

    public function index() {
        $this->load->language('extension/module/featured');

        $this->document->setTitle($this->language->get('heading_title'));

        $this->load->model('setting/module');

        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
            if (!isset($this->request->get['module_id'])) {
                $this->model_setting_module->addModule('featured', $this->request->post);
            } else {
                $this->model_setting_module->editModule($this->request->get['module_id'], $this->request->post);
            }

            $this->session->data['success'] = $this->language->get('text_success');

            $this->response->redirect($this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=module'));
        }

        // Rest of the controller code...
    }

    protected function validate() {
        if (!$this->user->hasPermission('modify', 'extension/module/featured')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        if ((utf8_strlen($this->request->post['name']) < 3) || (utf8_strlen($this->request->post['name']) > 64)) {
            $this->error['name'] = $this->language->get('error_name');
        }

        if (!$this->request->post['width']) {
            $this->error['width'] = $this->language->get('error_width');
        }

        if (!$this->request->post['height']) {
            $this->error['height'] = $this->language->get('error_height');
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
        ],
      },
      {
        id: "opencart/catalog",
        name: "catalog",
        type: "folder",
        path: "/path/to/opencart/catalog",
        isOpenCart: true,
        children: [
          {
            id: "opencart/catalog/controller",
            name: "controller",
            type: "folder",
            path: "/path/to/opencart/catalog/controller",
            isOpenCart: true,
            children: [
              {
                id: "opencart/catalog/controller/extension",
                name: "extension",
                type: "folder",
                path: "/path/to/opencart/catalog/controller/extension",
                isOpenCart: true,
                children: [
                  {
                    id: "opencart/catalog/controller/extension/module",
                    name: "module",
                    type: "folder",
                    path: "/path/to/opencart/catalog/controller/extension/module",
                    isOpenCart: true,
                    children: [
                      {
                        id: "opencart/catalog/controller/extension/module/featured.php",
                        name: "featured.php",
                        type: "file",
                        path: "/path/to/opencart/catalog/controller/extension/module/featured.php",
                        isOpenCart: true,
                        content: `<?php
namespace Opencart\\Catalog\\Controller\\Extension\\Module;

class Featured extends \\Opencart\\System\\Engine\\Controller {
    public function index(array $setting) {
        $this->load->language('extension/module/featured');

        $this->load->model('catalog/product');
        $this->load->model('tool/image');

        $data['products'] = [];

        if (!empty($setting['product'])) {
            $products = $setting['product'];

            foreach ($products as $product_id) {
                $product_info = $this->model_catalog_product->getProduct($product_id);

                if ($product_info) {
                    // Process product data for display
                    // ...
                    $data['products'][] = [
                        'product_id'  => $product_info['product_id'],
                        'thumb'       => $image,
                        'name'        => $product_info['name'],
                        'description' => utf8_substr(strip_tags(html_entity_decode($product_info['description'], ENT_QUOTES, 'UTF-8')), 0, $this->config->get('config_product_description_length')) . '..',
                        'price'       => $price,
                        'special'     => $special,
                        'tax'         => $tax,
                        'minimum'     => $product_info['minimum'] > 0 ? $product_info['minimum'] : 1,
                        'rating'      => $rating,
                        'href'        => $this->url->link('product/product', 'language=' . $this->config->get('config_language') . '&product_id=' . $product_info['product_id'])
                    ];
                }
            }
        }

        if ($data['products']) {
            return $this->load->view('extension/module/featured', $data);
        }
    }
}`,
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
    const isSearchMatch =
      searchTerm &&
      (node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.path.toLowerCase().includes(searchTerm.toLowerCase()))

    if (searchTerm && !isSearchMatch && node.type === "folder") {
      // Check if any children match the search
      const hasMatchingChild = (children?: FileNode[]): boolean => {
        if (!children) return false
        return children.some((child) => {
          if (
            child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            child.path.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return true
          }
          if (child.type === "folder") {
            return hasMatchingChild(child.children)
          }
          return false
        })
      }

      if (!hasMatchingChild(node.children)) {
        return null
      }
    }

    return (
      <div key={node.id} style={{ paddingLeft: `${level * 16}px` }}>
        <div
          className={`flex items-center py-1 px-2 rounded-md hover:bg-muted cursor-pointer ${
            selectedFile?.id === node.id ? "bg-muted" : ""
          } ${isSearchMatch ? "bg-yellow-50" : ""}`}
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
              <Folder className={`h-4 w-4 mr-2 ${node.isOpenCart ? "text-amber-500" : "text-blue-500"}`} />
            </>
          ) : (
            <>
              <span className="w-4 mr-1" />
              <FileText className={`h-4 w-4 mr-2 ${node.isOpenCart ? "text-amber-500" : "text-gray-500"}`} />
            </>
          )}
          <span className="text-sm">{node.name}</span>
          {node.isOpenCart && (
            <Badge variant="outline" className="ml-2 text-xs bg-amber-50 text-amber-700 border-amber-200">
              OpenCart
            </Badge>
          )}
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
            <CardTitle className="text-base">Файловый проводник</CardTitle>
            <div className="flex gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <FolderOpen className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Открыть папку</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Обновить</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск файлов..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="project" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="project">Проект</TabsTrigger>
              <TabsTrigger value="opencart">OpenCart</TabsTrigger>
            </TabsList>
          </Tabs>

          <ScrollArea className="h-[450px] mt-4 pr-4">
            {activeTab === "project" && renderFileTree(fileStructure)}
            {activeTab === "opencart" && (
              <>
                {isIndexed ? (
                  renderFileTree(openCartFiles)
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <AlertCircle className="h-10 w-10 text-amber-500 mb-2" />
                    <h3 className="text-lg font-medium mb-2">Файлы не проиндексированы</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Для доступа к файлам OpenCart необходимо выполнить индексацию
                    </p>
                    <Button>Индексировать файлы</Button>
                  </div>
                )}
              </>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">{selectedFile ? selectedFile.name : "Предпросмотр файла"}</CardTitle>
              {selectedFile?.isOpenCart && (
                <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                  OpenCart
                </Badge>
              )}
            </div>
            {selectedFile && (
              <div className="flex gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Открыть в редакторе</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Копировать путь</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <FileCode className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Анализировать с AI</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
          {selectedFile && <CardDescription className="text-xs font-mono mt-1">{selectedFile.path}</CardDescription>}
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <ScrollArea className="h-[520px] border rounded-md">
            {selectedFile ? (
              <>
                {selectedFile.isOpenCart && (
                  <div className="bg-amber-50 border-b border-amber-200 p-2 flex items-center gap-2">
                    <Info className="h-4 w-4 text-amber-600" />
                    <span className="text-xs text-amber-700">
                      Это оригинальный файл OpenCart. Используйте его как референс для вашего кода.
                    </span>
                  </div>
                )}
                <pre className="p-4 text-sm font-mono">{selectedFile.content}</pre>
              </>
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
