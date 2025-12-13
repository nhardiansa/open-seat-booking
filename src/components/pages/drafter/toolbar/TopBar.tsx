"use client"

import { Separator } from "@/components/ui/separator"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, Settings, Undo, Redo, Eye, EyeOff, Sun, Moon, Download, X } from "lucide-react"

interface TopBarProps {
  projectName: string
  onProjectNameChange: (name: string) => void
  isReadOnly: boolean
  onReadOnlyToggle: () => void
  isDarkMode: boolean
  onThemeToggle: () => void
}

export function TopBar({
  projectName,
  onProjectNameChange,
  isReadOnly,
  onReadOnlyToggle,
  isDarkMode,
  onThemeToggle,
}: TopBarProps) {
  return (
    <header className="h-12 bg-card border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>

        <Input
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value)}
          className="h-8 bg-transparent border-none text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
          disabled={isReadOnly}
        />

        <Button variant="ghost" size="sm" onClick={onReadOnlyToggle} className="h-8 text-xs">
          {isReadOnly ? (
            <>
              <Eye className="h-3 w-3 mr-1" />
              Read only
            </>
          ) : (
            <>
              <EyeOff className="h-3 w-3 mr-1" />
              Edit mode
            </>
          )}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Undo className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Redo className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onThemeToggle}>
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Download className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Settings className="h-4 w-4" />
        </Button>

        <Button size="sm" className="h-8">
          <Save className="h-3 w-3 mr-1" />
          Save
        </Button>
      </div>
    </header>
  )
}
