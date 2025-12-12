import { EditorToolbox } from '@/components/editor/EditorToolbox';
import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { EditorCanvas } from '@/components/editor/EditorCanvas';
import { EditorSidebar } from '@/components/editor/EditorSidebar';

export default function Editor() {
  return (
    <>
      <title>Editor - Open Seat Booking</title>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        {/* Toolbar - Top */}
        <EditorToolbar />

        {/* Main Content - 3 columns */}
        <div className="flex-1 flex overflow-hidden">
          {/* Toolbox - Left */}
          <EditorToolbox />

          {/* Canvas - Center */}
          <EditorCanvas />

          {/* Sidebar - Right */}
          <EditorSidebar />
        </div>
      </div>
    </>
  );
}

