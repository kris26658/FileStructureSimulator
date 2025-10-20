import useFileStore from "../hooks/store/useFileStore";

function Toolbar() {
    const { addFolder, addFile } = useFileStore();

    return (
        <div className="toolbar">
            <button onClick={addFolder}>New Folder</button>
            <button onClick={addFile}>New File</button>
            <form id="renameItemForm" style={{ display: "inline-block", marginLeft: "20px" }}>
                <input
                    type="text"
                    id="renameInput"
                    placeholder="Enter new name"
                    required
                />
                <button type="submit">Rename Selected</button>
            </form>
        </div>
    );

}

export default Toolbar;