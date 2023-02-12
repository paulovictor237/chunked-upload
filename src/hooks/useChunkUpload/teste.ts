import { useState, useEffect } from "react";

const chunkSize = 1024 * 1024;

interface ProgressStatus {
  progress: number;
  status: "in progress" | "finished";
}

export const useFileUpload = (file: File, apiUrl: string): ProgressStatus => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"in progress" | "finished">(
    "in progress"
  );

  useEffect(() => {
    const upload = async () => {
      const chunks = [];
      let start = 0;
      while (start < file.size) {
        const end = start + chunkSize;
        chunks.push(file.slice(start, end));
        start = end;
      }

      for (let i = 0; i < chunks.length; i++) {
        const formData = new FormData();
        formData.append("chunk", chunks[i]);
        formData.append("index", i);

        const response = await fetch(apiUrl, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload chunk.");
        }

        setProgress(((i + 1) / chunks.length) * 100);
      }

      setStatus("finished");
    };

    upload();
  }, [file, apiUrl]);

  return { progress, status };
};
