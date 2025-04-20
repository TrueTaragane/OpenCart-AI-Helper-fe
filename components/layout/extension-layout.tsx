"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  FolderPlus,
  FileArchive,
  FolderTree,
  FileText,
  Settings,
  Sparkles,
  Server,
} from "lucide-react"

interface ExtensionLayoutProps {
  children: React.ReactNode
  activeView?: string
}

export function ExtensionLayout({ children, activeView = "chat" }: ExtensionLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const navigationItems = [
    { id: "chat", label: "AI Chat", icon: MessageSquare },
    { id: "project", label: "Project Setup", icon: FolderPlus },
    { id: "versions", label: "Version Manager", icon: FileArchive },
    { id: "explorer", label: "File Explorer", icon: FolderTree },
    { id: "prompts", label: "Prompt Collection", icon: FileText },
    { id: "models", label: "AI Models", icon: Sparkles },
    { id: "local-models", label: "Local Models", icon: Server },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={cn(
          "flex flex-col border-r transition-all duration-300 bg-muted/30",
          sidebarCollapsed ? "w-12" : "w-48",
        )}
      >
        <div className="flex items-center justify-between p-2 border-b h-10">
          {!sidebarCollapsed && <span className="text-xs font-medium">OpenCart AI Helper</span>}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 ml-auto"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <nav className="p-2 space-y-1">
            <TooltipProvider delayDuration={0}>
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={activeView === item.id ? "secondary" : "ghost"}
                        className={cn("w-full justify-start", sidebarCollapsed ? "px-2" : "px-3")}
                        size={sidebarCollapsed ? "icon" : "sm"}
                        asChild
                      >
                        <a href={item.id === "chat" ? "/" : `/${item.id}`}>
                          <Icon className={cn("h-4 w-4", sidebarCollapsed ? "" : "mr-2")} />
                          {!sidebarCollapsed && <span>{item.label}</span>}
                        </a>
                      </Button>
                    </TooltipTrigger>
                    {sidebarCollapsed && (
                      <TooltipContent side="right">
                        <p>{item.label}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                )
              })}
            </TooltipProvider>
          </nav>
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
