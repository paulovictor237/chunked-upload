"use client";
import { Button } from "@/components/button";
import { ControlledChunkFile } from "@/components/controlled-chunk-file";
import { ControlledForm } from "@/components/controlled-form";
import { uploadFile } from "@/repositories/uploadFile";
import Link from "next/link";
import { useForm } from "react-hook-form";

export const ControlledHome = () => {
  const formMethods = useForm();
  const onSubmit = formMethods.handleSubmit(async (data) => {
    console.log(data);
  });

  const link = formMethods.watch("file");

  return (
    <main className="p-5 text-white bg-gray-700 h-screen">
      <ControlledForm
        formMethods={formMethods}
        onSubmit={onSubmit}
        className="flex flex-col gap-4 p-4 rounded-md bg-neutral-400"
      >
        <ControlledChunkFile name="file" uploadApi={uploadFile}>
          Drop your files here
        </ControlledChunkFile>

        <Button>Submit</Button>
      </ControlledForm>

      {link && (
        <Link
          target="_blank"
          rel="noreferrer"
          href={"http://localhost:4001/uploads/" + link}
          className="no-underline block bg-gray-500 mt-5 p-2 relative overflow-hidden rounded-md"
        >
          Link here
        </Link>
      )}
    </main>
  );
};
