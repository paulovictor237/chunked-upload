import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { BlobProps, Data, Props, Status } from "./types";

export const useFileUpload = ({
  queryFn,
  onSuccess,
  chunkSize = 1024,
}: Props) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<Status>("in progress");
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [abortController, setAbortController] = useState(new AbortController());

  const upload = async () => {
    if (!currentFile) return;
    if (abortController.signal.aborted) return;
    const length = Math.ceil(currentFile.size / chunkSize);
    const staticData: Omit<Data, "base64" | "index"> = {
      name: currentFile.name,
      size: currentFile.size,
      length: length,
    };
    try {
      for (let index = 0; index < length; index++) {
        const blob = Blob({ index, chunkSize, file: currentFile });
        const base64 = (await convertFileToBase64(blob as File)) as string;
        const data: Data = { ...staticData, base64, index };
        const response = await queryFn({
          data,
          signal: abortController.signal,
        });
        const progress = ((index + 1) / length) * 100;
        setProgress(progress);
        if (progress === 100) onSuccess?.(response);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error uploading chunk:", error.message);
      }
    }
    setStatus("finished");
  };

  const addFile = async (newFile: File) => {
    setProgress(0);
    setStatus("in progress");
    setAbortController(new AbortController());
    setCurrentFile(newFile);
  };

  const abortQuery = () => {
    abortController.abort();
    setProgress(0);
    setStatus("finished");
    setCurrentFile(null);
  };

  const Blob = ({ file, index, chunkSize }: BlobProps) => {
    const from = index * chunkSize;
    const to = from + chunkSize;
    const blob = file.slice(from, to);
    return blob;
  };

  const convertFileToBase64 = async (filepath: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(filepath);
      reader.onerror = (error) => reject(error);
      reader.onload = () => resolve(reader.result);
    });
  };

  useEffect(() => {
    upload();
    return () => abortController.abort();
  }, [currentFile, abortController]);

  return { progress, status, addFile, abortQuery };
};
