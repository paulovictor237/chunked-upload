import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import md5 from "md5";

const app = express();
app.use(bodyParser.raw({ type: "application/octet-stream", limit: "100mb" }));
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/uploads", express.static("uploads"));

app.post("/upload", (req, res) => {
  const { name, currentChunkIndex, totalChunks } = req.query;
  const { ip, body } = req;

  const extension = name.split(".").pop();
  const tmpFilename = "tmp_" + md5(name + ip) + "." + extension;

  const isFirstChunk = +currentChunkIndex === 0;
  const isLastChunk = +currentChunkIndex === +totalChunks - 1;
  const fileExists = fs.existsSync("./uploads/" + tmpFilename);

  if (isFirstChunk && fileExists) fs.unlinkSync("./uploads/" + tmpFilename);

  const base64 = body.toString();
  const data = base64.split(",")[1];
  const buffer = Buffer.from(data, "base64");
  fs.appendFileSync("./uploads/" + tmpFilename, buffer);

  if (!isLastChunk) return res.json("ok");

  const finalFilename = md5(Date.now()).slice(0, 6) + "." + extension;
  fs.renameSync("./uploads/" + tmpFilename, "./uploads/" + finalFilename);
  res.json({ finalFilename });
});

app.listen(4001);
