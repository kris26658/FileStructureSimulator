import Sidebar from "../sidebar/Sidebar";
import Toolbar from "./Toolbar";

function FileExplorer() {

    return (
        <>
            < Sidebar />
            <div id="fileExplorer">
                <h1>File Explorer</h1>
                <Toolbar />
                <div id="rootFolder"></div>
            </div >
        </>
    );
}

export default FileExplorer;