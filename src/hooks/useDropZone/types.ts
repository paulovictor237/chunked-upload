import { DragEvent } from "react";

export type OnDragOver = (e: DragEvent<HTMLElement>, active: boolean) => void;

export type HandleDrop = (
  e: DragEvent<HTMLElement>,
  setFile: (fileList: FileList) => void
) => void;
