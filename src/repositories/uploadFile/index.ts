import { UploadApi } from "@/hooks/useChunkUpload/types";
import axios from "axios";

export const uploadFile: UploadApi = async ({ data, params }) => {
  const headers = { "Content-Type": "application/octet-stream" };
  const url = "http://localhost:4001/upload?" + params.toString();
  const response = await axios.post(url, data, { headers });
  return response.data.finalFilename;
};
