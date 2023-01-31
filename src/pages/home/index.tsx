"use client";
import { useChunkUpload } from "@/hooks/useChunkUpload";
import { useDropZone } from "@/hooks/useDropZone";
import { uploadFile } from "@/repositories/uploadFile";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { DragEvent } from "react";

export const Home = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [currentFileIndex, setCurrentFileIndex] = useState<number>(0);
  const [serverLink, setServerLink] = useState<string[]>([]);

  const { dropzoneActive, handleDrop, onDragOver } = useDropZone();

  const { addFile, status, progress } = useChunkUpload({
    uploadApi: uploadFile,
    onSuccess: (response) => setServerLink((p) => [...p, response]),
  });

  const addNewFile = () => {
    if (status !== "finished") return;
    if (files.length === 0) return;
    if (files.length === currentFileIndex) return;
    addFile(files[currentFileIndex]);
    setCurrentFileIndex((p) => p + 1);
  };

  const progressFn = (index: number) => {
    if (index < currentFileIndex - 1) return 100;
    if (index > currentFileIndex - 1) return 0;
    return progress;
  };

  const onDrop = (e: DragEvent<HTMLElement>) => {
    handleDrop(e, (newFiles) =>
      setFiles((p) => [...p, ...Array.from(newFiles)])
    );
  };

  useEffect(() => {
    addNewFile();
  }, [files.length, status]);

  return (
    <main className="p-5 text-white bg-gray-700 h-screen">
      <section
        onDragOver={(e) => onDragOver(e, true)}
        onDragLeave={(e) => onDragOver(e, false)}
        onDrop={(e) => onDrop(e)}
        className={twMerge(
          "text-center uppercase border-2 p-6 border-dashed rounded-md ",
          dropzoneActive
            ? "border-yellow-500 border-solid bg-blue-500"
            : "border-blue-500"
        )}
      >
        Drop your files here
      </section>
      <div className="files">
        {files.map((file, fileIndex) => {
          const progress = progressFn(fileIndex);
          return (
            <Link
              key={file.name + fileIndex}
              target="_blank"
              rel="noreferrer"
              href={"http://localhost:4001/uploads/" + serverLink[fileIndex]}
              className="no-underline block bg-gray-500 mt-5 p-2 relative overflow-hidden rounded-md"
            >
              <div className="text-lg">{file.name}</div>
              <div className="h-7 text-center rounded-md bg-red-500 overflow-hidden relative">
                <pre
                  className={twMerge(
                    "h-full",
                    progress === 100 ? "bg-blue-500" : "bg-yellow-400"
                  )}
                  style={{ width: progress + "%" }}
                ></pre>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {progress}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};
