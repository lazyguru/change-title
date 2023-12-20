import express from "express";
import ViteExpress from "vite-express";
import fs from "fs";

const STREAM_TITLE_FILE = process.env.HOME + "/some/path/to/streamTitle.txt";
const app = express();

/**
 * This function updates the stream title file and
 * returns the new title
 *
 * @param {string} streamTitle
 * @returns {string}
 */
function updateStreamTitle(streamTitle) {
  streamTitle = decodeURIComponent(streamTitle);
  fs.writeFileSync(STREAM_TITLE_FILE, streamTitle);
  return streamTitle;
}

app.get("/get-title", (req, res) => {
  res.send(fs.readFileSync(STREAM_TITLE_FILE, "utf8"));
});

app.get("/set-title", (req, res) => {
  updateStreamTitle(req.query.title);
  res.send("OK");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
