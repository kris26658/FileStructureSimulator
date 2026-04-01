import { getNodeLabel } from "./nodeFactory";

function updateFolderCounter(folder) {
    const counter = folder?.querySelector(":scope > .childCount");

    if (counter) {
        // Count all descendants so parent folders reflect nested changes.
        counter.innerText = folder.querySelectorAll(":scope .node").length;
    }
}

function updateFolderAndParents(folder) {
    let currentFolder = folder;

    while (currentFolder?.classList?.contains("folder")) {
        updateFolderCounter(currentFolder);
        currentFolder = currentFolder.parentElement?.closest?.(".folder");
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
        const sourceFolder = draggedNode?.parentElement?.closest?.(".folder");

        //allow dropping into folders or back to root.
        if (draggedNode && draggedNode !== targetFolder) {
            if (targetFolder && targetFolder !== draggedNode) {
                targetFolder.classList.add("open");
                targetFolder.appendChild(draggedNode);
                updateFolderAndParents(targetFolder);
            } else {
                rootFolder.appendChild(draggedNode);
            }

            //source folder and its parents may lose descendants after a move.
            if (sourceFolder && sourceFolder !== targetFolder) {
                updateFolderAndParents(sourceFolder);
            }
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