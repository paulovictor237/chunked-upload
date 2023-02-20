import { UploadApi } from "@/hooks/useChunkUpload/types";
import { QueryFn } from "@/hooks/useChunkUpload2/types";
import axios from "axios";

export const uploadFile: UploadApi = async (data) => {
  const params = new URLSearchParams();
  params.set("name", data.name);
  params.set("size", data.size);
  params.set("currentChunkIndex", data.index);
  params.set("totalChunks", data.total);
  const headers = { "Content-Type": "application/octet-stream" };
  const url = "http://localhost:4001/upload?" + params.toString();
  const response = await axios.post(url, data.file, { headers });
  return response.data.finalFilename;
};

export const uploadFile2: QueryFn = async ({ data, signal }) => {
  const params = new URLSearchParams();
  params.set("name", data.name);
  params.set("size", data.size);
  params.set("currentChunkIndex", data.index);
  params.set("totalChunks", data.length);
  const headers = { "Content-Type": "application/octet-stream" };
  const url = "http://localhost:4001/upload?" + params.toString();
  const response = await axios.post(url, data.base64, { headers, signal });
  return response.data.finalFilename;
};
