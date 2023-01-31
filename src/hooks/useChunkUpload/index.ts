import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FileProps, Props, UploadApiParms } from "./types";

const KB = 1024; //bytes

const initialState: FileProps = {
  currentFile: null,
  currentChunkIndex: -1,
  chunks: -1,
  progress: 100,
  status: "finished",
};

export const useChunkUpload = ({
  chunkSize = 10 * KB,
  uploadApi,
  onSuccess,
  onAbort,
}: Props) => {
  const [file, setFile] = useState<FileProps>(initialState);
  const [abort, setAbort] = useState<boolean>(false);
  const { mutateAsync } = useMutation(uploadApi);
  const { currentChunkIndex, currentFile, chunks } = file;

  const readAndUploadCurrentChunk = () => {
    if (!currentFile) return;
    const from = currentChunkIndex * chunkSize;
    const to = from + chunkSize;
    const blob = currentFile.slice(from, to);
    const reader = new FileReader();
    reader.onload = (e) => uploadChunk(e);
    reader.readAsDataURL(blob);
  };

  const uploadChunk = async (readerEvent: ProgressEvent<FileReader>) => {
    const targetFile = readerEvent.target?.result as string;
    const isNotAbleToUpload =
      !currentFile ||
      !targetFile ||
      currentChunkIndex >= chunks ||
      file.status !== "progress";
    if (isNotAbleToUpload) return;
    const data: UploadApiParms = {
      file: targetFile,
      name: currentFile.name,
      index: currentChunkIndex.toString(),
      total: chunks.toString(),
      size: currentFile.size.toString(),
    };
    try {
      const response = await mutateAsync(data);
      const isFinished = currentChunkIndex === chunks - 1;
      if (isFinished) {
        setFile(initialState);
        onSuccess?.(response);
      } else {
        setFile((p) => ({
          ...p,
          progress: +(((currentChunkIndex + 1) / chunks) * 100).toFixed(2),
          currentChunkIndex: p.currentChunkIndex + 1,
        }));
      }
      return response;
    } catch (error) {
      return error;
    }
  };

  const addFile = (newFile: globalThis.File) => {
    if (file.status === "progress") abortUpload(false);
    setFile({
      currentFile: newFile,
      chunks: Math.ceil(newFile.size / chunkSize),
      currentChunkIndex: 0,
      progress: 0,
      status: "progress",
    });
  };

  const abortRequest = () => setAbort(true);

  const abortUpload = async (completeAbort = true) => {
    try {
      if (!currentFile) throw new Error("no file");
      onAbort?.(currentFile.name);
    } catch (error) {
      return error;
    } finally {
      setAbort(false);
      if (completeAbort) setFile(initialState);
    }
  };

  useEffect(() => {
    abort ? abortUpload() : readAndUploadCurrentChunk();
  }, [currentChunkIndex]);

  return { ...file, addFile, abortRequest };
};
