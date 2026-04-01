import Templates from "./Templates"
import ToDoList from "./ToDoList"

function SideBar() {
    return (
        <div className="sidebar">
            <h3>File Structure Simulator</h3>
            Tips:
                <ul>
                    <li>Drag and drop files and folders to organize them.</li>
                    <li>Click on folders to expand or collapse their contents.</li>
                    <li>Double-click on a file or folder to rename it.</li>
                </ul>
            <Templates />
            <ToDoList />
        </div>
    );
}

export default SideBar;