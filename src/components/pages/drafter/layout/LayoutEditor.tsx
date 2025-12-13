import { useState } from "react"
import { Canvas } from "../canvas/Canvas"
import { TopBar } from "../toolbar/TopBar"
import { PropertiesSidebar } from "../properties/PropertiesSidebar"
import { ToolSideBar } from "../toolbar/ToolSidebar"

export function LayoutEditor() {
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

      <div className="flex flex-1 overflow-hidden relative">

        {/* Left Sidebar */}
        <ToolSideBar />

        {/* Main Canvas */}
        <main className="flex-1 relative">
          <Canvas />
        </main>

        {/* Right Sidebar */}
        <PropertiesSidebar />
      </div>
    </div>
  )
}
