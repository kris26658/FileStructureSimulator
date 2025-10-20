
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FileExplorer from "./components/FileExplorer/FileExplorer.jsx"

function App() {

  return (
      <DndProvider backend={HTML5Backend}>
        <FileExplorer />
      </DndProvider>
  );
};

export default App
