import { useState } from "react";
import createNode from "../hooks/createNode";

function Toolbar() {
    // State to store the selected node type
    const [nodeType, setNodeType] = useState("folder");

    // Function to handle form submission
    const handleCreateNode = (event) => {
        event.preventDefault(); // Prevent form submission
        createNode(nodeType); // Call createNode with the selected node type
    };

    return (
        <div className="toolbar">
            <form id="newNode">
                <select
                    id="newNode"
                    name="newNode"
                    value={nodeType}
                    onChange={(event) => setNodeType(event.target.value)} // Update state on change
                >
                    <option value="folder">Folder</option>
                    <option value="file">File</option>
                </select>
                <button onClick={handleCreateNode}>Create</button>
            </form>
        </div>
    );
}

export default Toolbar;