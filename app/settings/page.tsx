import { ExtensionLayout } from "@/components/layout/extension-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <ExtensionLayout activeView="settings">
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4">Settings</h2>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure general extension settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-path">Default Project Path</Label>
                  <div className="flex gap-2">
                    <Input id="project-path" defaultValue="/path/to/projects" className="flex-1" />
                    <Button variant="outline">Browse</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-version">Default OpenCart Version</Label>
                  <Select defaultValue="4.x">
                    <SelectTrigger id="default-version">
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4.x">OpenCart 4.x</SelectItem>
                      <SelectItem value="3.x">OpenCart 3.x</SelectItem>
                      <SelectItem value="2.x">OpenCart 2.x</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-save">Auto-save Generated Code</Label>
                    <p className="text-xs text-muted-foreground">Automatically save generated code to files</p>
                  </div>
                  <Switch id="auto-save" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Configure API keys for AI services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="openai-key">OpenAI API Key</Label>
                  <Input id="openai-key" type="password" placeholder="sk-..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gemini-key">Google Gemini API Key</Label>
                  <Input id="gemini-key" type="password" placeholder="AIza..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="openrouter-key">OpenRouter API Key</Label>
                  <Input id="openrouter-key" type="password" placeholder="sk-or-..." />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the extension appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select defaultValue="system">
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compact-mode">Compact Mode</Label>
                    <p className="text-xs text-muted-foreground">Use a more compact UI layout</p>
                  </div>
                  <Switch id="compact-mode" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-icons">Show Icons</Label>
                    <p className="text-xs text-muted-foreground">Display icons in the interface</p>
                  </div>
                  <Switch id="show-icons" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Configure advanced extension settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ollama-url">Ollama Server URL</Label>
                  <Input id="ollama-url" defaultValue="http://localhost:11434" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-tokens">Max Tokens</Label>
                  <Input id="max-tokens" type="number" defaultValue="4096" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="debug-mode">Debug Mode</Label>
                    <p className="text-xs text-muted-foreground">Enable debug logging</p>
                  </div>
                  <Switch id="debug-mode" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ExtensionLayout>
  )
}
