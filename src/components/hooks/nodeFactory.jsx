function createNodeElement(id, type) {
    const node = document.createElement("div");
    const label = document.createElement("span");
    const counter = document.createElement("span");

    node.id = `node-${id}`;
    node.className = `${type} node`;
    label.className = "node-label";
    label.innerText = type === "file" ? "New File" : "New Folder";
    node.appendChild(label);
    node.draggable = true;

    if (node.classList.contains("folder")) {
        counter.className = "childCount";
        counter.innerText = "0";
        node.appendChild(counter);
    }

    //keep nested drags from being overwritten by ancestor node listeners.
    node.addEventListener("dragstart", (event) => {
        event.stopPropagation();
        event.dataTransfer.setData("text/plain", node.id);
        event.dataTransfer.effectAllowed = "move";
    });

    return node;
}

function getNodeLabel(node) {
    return Array.from(node.children).find((child) => child.classList.contains("node-label"));
}

export { createNodeElement, getNodeLabel };