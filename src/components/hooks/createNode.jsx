function createNode(nodeType) {
    const rootFolder = document.getElementById("rootFolder");
    const currentNodes = rootFolder.children.length;
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

    // Add a single dragover and drop listener to the rootFolder
    if (!rootFolder.dataset.listenersAdded) {
        rootFolder.addEventListener("dragover", (event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        });

        rootFolder.addEventListener("drop", (event) => {
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


        let clickTimeout;
        rootFolder.addEventListener("click", (event) => {
            const clickedElement = event.target;

            // Clear the timeout if it's a double-click
            if (clickTimeout) {
                clearTimeout(clickTimeout);
                clickTimeout = null;
                return;
            }

            // Set a timeout to handle single-click logic
            clickTimeout = setTimeout(() => {
                clickTimeout = null;

                // Check if the clicked element is a folder
                if (clickedElement.classList.contains("folder")) {
                    clickedElement.classList.toggle("open");
                }
            }, 250); // Adjust the delay as needed (250ms is a common threshold)
        });

        // Add double-click event listener
        rootFolder.addEventListener("dblclick", (event) => {
            const clickedElement = event.target;

            // Ensure the clicked element is not a child
            if (clickedElement.classList.contains("node")) {
                const currentName = clickedElement.innerText;

                // prompt for a new name
                const newName = prompt("Enter new name:", currentName);
                if (newName !== null && newName.trim() !== "") {
                    clickedElement.innerText = newName.trim();
                }

            }
        });

        rootFolder.dataset.listenersAdded = true; // Mark listeners as added
    }

    // Append the new node to rootFolder
    rootFolder.appendChild(newNode);
}

export default createNode;