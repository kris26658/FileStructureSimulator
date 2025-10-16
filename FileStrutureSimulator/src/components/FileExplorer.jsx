import objects from "./Objects";

function FileExplorer() {

    return (
        <>
            <h1>File Explorer</h1>
            <button id="createFileBtn" onClick={creatFile()}>Create New File</button>
            <button id="createFolderBtn" onClick={creatFolder()}>Create New Folder</button>

            <div id="fileExplorer"></div>
        </>
    );

};

function createFile() {
    let file = {
        name: "file" + objects.FileList.length,
        type: "file"
    }
    objects.FileList.push(file);
    console.log(objects.FileList);
}

function createFolder() {
    let folder = {
        name: "folder" + objects.FileList.length,
        type: "folder",
        children: []
    }
    objects.FileList.push(folder);
    console.log(objects.FileList);
}

export default FileExplorer;