import DraggableFile from "../hooks/useDrop";
import useFileStore from "../hooks/store/useFileStore";
import Toolbar from "./Toolbar";

function FileExplorer() {
    const { files, select, selectedId } = useFileStore();
    const selectedItem = files.find((item) => item.id === selectedId);

    return (
        <>
            <h1>File Explorer</h1>
            <div id="selected">
                {selectedItem ? `Selected: ${selectedItem.name}` : "No item selected."}
            </div>
            <Toolbar />
            <br />
            <div id="fileExplorer">
                {files.length === 0 ? (
                    <p>No files or folders available.</p>
                ) : (
                    <ul>
                        {files.map((item) => (
                            <DraggableFile
                                key={item.id}
                                item={item}
                                onSelect={() => select(item.id)}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default FileExplorer;