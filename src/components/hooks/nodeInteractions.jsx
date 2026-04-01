import { getNodeLabel } from "./nodeFactory";

function updateFolderChildCount(folder) {
    if (!folder || !folder.classList?.contains("folder")) {
        return;
    }

    const counter = folder.querySelector(":scope > .childCount");
    if (!counter) {
        return;
    }

    counter.innerText = folder.querySelectorAll(":scope > .node").length;
}

function updateAncestorFolderCounts(startElement, rootFolder) {
    let current = startElement;

    while (current && current !== rootFolder) {
        if (current.classList?.contains("folder")) {
            updateFolderChildCount(current);
        }

        current = current.parentElement?.closest?.(".folder") ?? null;
    }
}

function attachNodeInteractions(rootFolder) {
    if (rootFolder.dataset.listenersAdded) {
        return;
    }

    rootFolder.addEventListener("dragover", (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    });

    rootFolder.addEventListener("drop", (event) => {
        event.preventDefault();
        const draggedNode = document.getElementById(event.dataTransfer.getData("text/plain"));
        const dropTarget = event.target;
        const targetFolder = dropTarget.closest?.(".folder");
        const sourceParentFolder = draggedNode?.parentElement?.closest?.(".folder") ?? null;

        //allow dropping into folders or back to root.
        if (draggedNode && draggedNode !== targetFolder) {
            if (targetFolder && targetFolder !== draggedNode) {
                targetFolder.classList.add("open");
                targetFolder.appendChild(draggedNode);

                // Update destination folder and all its ancestors.
                updateAncestorFolderCounts(targetFolder, rootFolder);
            } else {
                rootFolder.appendChild(draggedNode);
            }

            // Update source folder and all its ancestors after the move.
            updateAncestorFolderCounts(sourceParentFolder, rootFolder);
        }
    });

    let clickTimeout;
    rootFolder.addEventListener("click", (event) => {
        const clickedElement = event.target;

        //clear the timeout if this click becomes part of a double-click.
        if (clickTimeout) {
            clearTimeout(clickTimeout);
            clickTimeout = null;
            return;
        }

        clickTimeout = setTimeout(() => {
            clickTimeout = null;
            const clickedFolder = clickedElement.closest?.(".folder");

            if (clickedFolder) {
                clickedFolder.classList.toggle("open");
            }
        }, 250);
    });

    rootFolder.addEventListener("dblclick", (event) => {
        const clickedElement = event.target;
        const clickedNode = clickedElement.closest?.(".node");

        if (clickedNode) {
            const labelElement = getNodeLabel(clickedNode);
            const currentName = labelElement?.innerText ?? "";
            const newName = prompt("Enter new name:", currentName);

            if (labelElement && newName !== null && newName.trim() !== "") {
                labelElement.innerText = newName.trim();
            }
        }
    });

    rootFolder.dataset.listenersAdded = true;
}

export default attachNodeInteractions;