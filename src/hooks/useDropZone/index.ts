import { useState, DragEvent } from "react";
import { HandleDrop, OnDragOver } from "./types";

export const useDropZone = () => {
  const [dropzoneActive, setDropzoneActive] = useState(false);

  const onDragOver: OnDragOver = (e, active) => {
    e.preventDefault();
    setDropzoneActive(active);
  };

  const handleDrop: HandleDrop = (e, setFile) => {
    e.preventDefault();
    setDropzoneActive(false);
    const currentFile = e.dataTransfer.files;
    setFile(currentFile);
  };

  return { dropzoneActive, onDragOver, handleDrop };
};
