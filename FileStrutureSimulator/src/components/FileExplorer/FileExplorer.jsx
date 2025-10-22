
import Toolbar from "./Toolbar";

function FileExplorer() {

        return (
        <>
            <h1>File Explorer</h1>
            <Toolbar />
            <br />
            <div id="fileExplorer" class="folder node"></div>
        </>
    );
}

export default FileExplorer;