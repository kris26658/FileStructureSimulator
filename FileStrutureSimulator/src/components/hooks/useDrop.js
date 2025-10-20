import { useDrag, useDrop } from "react-dnd";
import useFileStore from "../../store/useFileStore";
import { useRef } from "react";

function DraggableFile({ item, onSelect }) {
    const { moveFile } = useFileStore();
    const ref = useRef(null); // Create a single ref

    // Make the file draggable
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "file",
        item: { id: item.id, type: item.type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    // Make folders droppable
    const [, drop] = useDrop(() => ({
        accept: "file",
        drop: (draggedItem) => {
            if (item.type === "folder" && draggedItem.id !== item.id) {
                moveFile(draggedItem.id, item.id);
            }
        },
        canDrop: (draggedItem) => item.type === "folder" && draggedItem.id !== item.id,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    // Combine drag and drop refs
    drag(drop(ref));

    return (
        <li
            ref={ref} // Use the combined ref
            onClick={onSelect}
            style={{
                cursor: "pointer",
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            {item.type === "folder" ? "📁" : "📄"} {item.name}
        </li>
    );
};

export default DraggableFile;