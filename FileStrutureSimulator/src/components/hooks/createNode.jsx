function createNode(nodeType) {
    const fileExplorer = document.getElementById("fileExplorer");
    const currentNodes = fileExplorer.children.length;
    const newId = currentNodes + 1;

    // Helper function to create and configure a new node
    const createNewNode = (id, type) => {
        const node = document.createElement("div");
        node.id = `node-${id}`;
        node.className = `${type} node`;
        node.innerText = type === "file" ? "New File" : "New Folder";
        node.draggable = true;

        // Add drag-and-drop event listeners
        node.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", node.id);
            event.dataTransfer.effectAllowed = "move";
        });

        return node;
    };

    const newNode = createNewNode(newId, nodeType);

    // Add a single dragover and drop listener to the fileExplorer
    if (!fileExplorer.dataset.listenersAdded) {
        fileExplorer.addEventListener("dragover", (event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        });

        fileExplorer.addEventListener("drop", (event) => {
            event.preventDefault();
            const draggedNode = document.getElementById(event.dataTransfer.getData("text/plain"));
            const dropTarget = event.target;

            // Allow drop in folders and file explorer
            if (draggedNode && draggedNode !== dropTarget) {
                if (dropTarget.classList.contains("folder")) {
                    dropTarget.classList.add("open")
                    dropTarget.appendChild(draggedNode)
                }
            }
        });
        fileExplorer.addEventListener("click", (event) => {
            const clickedElement = event.target;
        
            // Check if the clicked element is a folder
            if (clickedElement.classList.contains("folder")) {
                clickedElement.classList.toggle("open");
                
            }
        });

        fileExplorer.dataset.listenersAdded = true; // Mark listeners as added
    }

    // Append the new node to fileExplorer
    fileExplorer.appendChild(newNode);
}

export default createNode;