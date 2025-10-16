function objects() {
    //objects
    let FileList = [];

    let file = {
        name: "file" + FileList.length,
        type: "file"
    }

    let folder = {
        name: "folder" + FileList.length,
        type: "folder",
        children: []
    }

    FileList.push(file);
}

export default objects;