function createNode(nodeType) {
    const rootFolder = document.getElementById("rootFolder");
    const currentNodes = rootFolder.querySelectorAll(".node").length;
    const newId = currentNodes + 1;

    const getNodeLabelElement = (node) => {
        return Array.from(node.children).find((child) => child.classList.contains("node-label"));
    };

    //create a new node based on type
    const createNewNode = (id, type) => {
        const node = document.createElement("div");
        const label = document.createElement("span");
        node.id = `node-${id}`;
        node.className = `${type} node`;
        label.className = "node-label";
        label.innerText = type === "file" ? "New File" : "New Folder";
        node.appendChild(label);
        node.draggable = true;

        //add drag-and-drop event listeners
        node.addEventListener("dragstart", (event) => {
            //keep nested drags from being overwritten by ancestor node listeners.
            event.stopPropagation();
            event.dataTransfer.setData("text/plain", node.id);
            event.dataTransfer.effectAllowed = "move";
        });
        return node;
    };

    const newNode = createNewNode(newId, nodeType);

    //add a single dragover and drop listener to the rootFolder
    if (!rootFolder.dataset.listenersAdded) {
        rootFolder.addEventListener("dragover", (event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        });

        rootFolder.addEventListener("drop", (event) => {
            event.preventDefault();
            const draggedNode = document.getElementById(event.dataTransfer.getData("text/plain"));
            const dropTarget = event.target;
            const targetFolder = dropTarget.closest?.(".folder");

            //allow drop in folders
            if (draggedNode && draggedNode !== targetFolder) {
                if (targetFolder && targetFolder !== draggedNode) {
                    targetFolder.classList.add("open")
                    targetFolder.appendChild(draggedNode)
                } else {
                    rootFolder.appendChild(draggedNode);
                }
            }
        });

        let clickTimeout;
        rootFolder.addEventListener("click", (event) => {
            const clickedElement = event.target;

            //Clear the timeout if it's a double-click
            if (clickTimeout) {
                clearTimeout(clickTimeout);
                clickTimeout = null;
                return;
            }

            //Set a timeout to handle single-click logic
            clickTimeout = setTimeout(() => {
                clickTimeout = null;
                const clickedFolder = clickedElement.closest?.(".folder");

                // Check if the clicked element is a folder
                if (clickedFolder) {
                    clickedFolder.classList.toggle("open");
                }
            }, 250); //Adjust the delay as needed (250ms is a common threshold)
        });

        //add double-click event listener
        rootFolder.addEventListener("dblclick", (event) => {
            const clickedElement = event.target;
            const clickedNode = clickedElement.closest?.(".node");

            if (clickedNode) {
                const labelElement = getNodeLabelElement(clickedNode);
                const currentName = labelElement?.innerText ?? "";

                //prompt for a new name
                const newName = prompt("Enter new name:", currentName);
                if (labelElement && newName !== null && newName.trim() !== "") {
                    labelElement.innerText = newName.trim();
                }
            }
        });

        rootFolder.dataset.listenersAdded = true; //mark listeners as added
    }

    //append the new node to rootFolder
    rootFolder.appendChild(newNode);
}

export default createNode;