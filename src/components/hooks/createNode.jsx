import { createNodeElement } from "./nodeFactory";
import attachNodeInteractions from "./nodeInteractions";

function createNode(nodeType) {
    const rootFolder = document.getElementById("rootFolder");
    const currentNodes = rootFolder.querySelectorAll(".node").length;
    const newId = currentNodes + 1;
    const newNode = createNodeElement(newId, nodeType);

    attachNodeInteractions(rootFolder);
    rootFolder.appendChild(newNode);
}

export default createNode;