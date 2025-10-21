import { create } from "zustand";

//initialize localStorage if not present
if (!localStorage.getItem('files')) {
  localStorage.setItem('files', JSON.stringify([]));
}

//blank file and folder templates
const blankFolder = {
  id: null,
  parentId: null,
  name: "New Folder",
  type: "folder",
  description: "",
  children: [],
};

const blankFile = {
  id: null,
  name: "New File",
  type: "file",
  description: "",
};

// Zustand store for file management
const useFileStore = create((set) => {
  const updateLocalStorage = (files) => {
    localStorage.setItem('files', JSON.stringify(files));
  };

  const addItem = (itemTemplate) => {
    set((state) => {
      const newItem = { ...itemTemplate, id: state.files.length + 1 };
      const updatedFiles = [...state.files, newItem];
      updateLocalStorage(updatedFiles);
      return { files: updatedFiles };
    });
  };

  return {
    files: JSON.parse(localStorage.getItem('files')) || [],
    selectedId: null,

    select: (id) => set({ selectedId: id }),

    addFolder: () => addItem(blankFolder),

    addFile: () => addItem(blankFile),

    renameItem: (id, newName) =>
      set((state) => {
        const updatedFiles = state.files.map((item) =>
          item.id === id ? { ...item, name: newName } : item
        );
        updateLocalStorage(updatedFiles);
        return { files: updatedFiles };
      }),

    moveFile: (id, targetId) =>
      set((state) => {
        const updatedFiles = state.files.map((item) =>
          item.id === id ? { ...item, parentId: targetId } : item
        );
        return { files: updatedFiles };
      }),
  };
});

export default useFileStore;