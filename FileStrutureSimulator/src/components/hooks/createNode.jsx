function createNode(nodeType) {
    const fileExplorer = document.getElementById("fileExplorer");
    const currentNodes = fileExplorer ? fileExplorer.children.length : 0; // Count existing nodes
    const newId = currentNodes + 1; // Increment ID based on the count

    // Create a new new node element
    let newNode = document.createElement("div");

    newNode.id = "node-" + newId;
    newNode.className = `${nodeType} node`;
    newNode.innerText = nodeType === "file" ? "New File" : "New Folder";
    newNode.draggable = true;
    newNode.parentNode = fileExplorer; // Track parent node

    // Add drag-and-drop event listeners
    newNode.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", newNode.id); // Store the node ID
        event.dataTransfer.effectAllowed = "move";
    });

    newNode.addEventListener("dragover", (event) => {
        event.preventDefault(); // Allow dropping
        event.dataTransfer.dropEffect = "move";
    });

    newNode.addEventListener("drop", (event) => {
        event.preventDefault();
        const draggedNode = document.getElementById(event.dataTransfer.getData("text/plain"));

        // Drag nodes into file explorer
        if (draggedNode && draggedNode !== newNode) {
            fileExplorer.appendChild(draggedNode);
            draggedNode.parentNode = fileExplorer
        }

        // Drag nodes into folder
        if (newNode.classList.contains("folder") && draggedNode && draggedNode !== newNode) {
            newNode.appendChild(draggedNode);
        }
    });
    fileExplorer.appendChild(newNode);
}

export default createNode