import { useState, useEffect } from "react";

const chunkSize = 1024 * 1024;

interface ProgressStatus {
  progress: number;
  status: "in progress" | "finished";
}

interface FileUploadOptions {
  onSuccess?: (response: any) => void;
}

export const useFileUpload = (
  file: File,
  apiUrl: string,
  options?: FileUploadOptions
): ProgressStatus & {
  addFile: (newFile: File) => void;
  abortUpload: () => void;
} => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"in progress" | "finished">(
    "in progress"
  );
  const [currentFile, setCurrentFile] = useState(file);
  const [abortController, setAbortController] = useState(new AbortController());

  useEffect(() => {
    const upload = async () => {
      const chunks = [];
      let start = 0;
      while (start < currentFile.size) {
        const end = start + chunkSize;
        chunks.push(currentFile.slice(start, end));
        start = end;
      }

      for (let i = 0; i < chunks.length; i++) {
        const formData = new FormData();
        formData.append("chunk", chunks[i]);
        formData.append("index", i);

        const response = await fetch(apiUrl, {
          method: "POST",
          body: formData,
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to upload chunk.");
        }

        setProgress(((i + 1) / chunks.length) * 100);
      }

      setStatus("finished");

      if (options && options.onSuccess) {
        const response = await fetch(apiUrl);
        options.onSuccess(await response.json());
      }
    };

    upload();

    return () => {
      abortController.abort();
    };
  }, [currentFile, apiUrl, options, abortController]);

  const addFile = (newFile: File) => {
    setCurrentFile(newFile);
    setProgress(0);
    setStatus("in progress");
    setAbortController(new AbortController());
  };

  const abortUpload = () => {
    abortController.abort();
    setProgress(0);
    setStatus("in progress");
  };

  return { progress, status, addFile, abortUpload };
};
