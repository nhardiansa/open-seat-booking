import { useState } from "react"
import { Canvas } from "../canvas/Canvas"
import { TopBar } from "../toolbar/TopBar"
import { ToolSidebar } from "../toolbar/ToolSidebar"
import { PropertiesSidebar } from "../properties/PropertiesSidebar"

export function LayoutEditor() {
  const [selectedTool, setSelectedTool] = useState("select")
  const [projectName, setProjectName] = useState("Theater Layout Design")
  const [isReadOnly, setIsReadOnly] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-background">
      <TopBar
        projectName={projectName}
        onProjectNameChange={setProjectName}
        isReadOnly={isReadOnly}
        onReadOnlyToggle={() => setIsReadOnly(!isReadOnly)}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
      />

      <div className="flex flex-1 overflow-hidden">
        <ToolSidebar selectedTool={selectedTool} onToolSelect={setSelectedTool} />

        <main className="flex-1 relative">
          <Canvas selectedTool={selectedTool} />
        </main>

        <PropertiesSidebar />
      </div>
    </div>
  )
}
