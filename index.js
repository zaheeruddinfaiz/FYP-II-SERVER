const express = require("express");
const app = express();
const fs = require("fs");
const HandleBars = require("handlebars");
const jwt = require("jsonwebtoken");
const { getAdPath } = require("./utils/get-ad-path");

app.get("/:age/:gender/:jwt", async (req, res) => {
  try {
    let decoded = jwt.verify(req.params.jwt, process.env.SECRET_KEY);

    if (decoded.secretNumber == process.env.SECRET_NUMBER) {

      fs.readFile("./video.html", async (error, data) => {

        if (error) {
          return res.status(500).send("Internel Server error occured");
        }
        let html = data.toString();
        let adPath = await getAdPath(req.params.age, req.params.gender);
        adPath = adPath.split("/").join("slash");

        let template = HandleBars.compile(html);

        let finalHtml = template({ filePath: adPath });
        res.send(finalHtml);

      });

    } else {
      return res.status(401).send("Unauthorized");
    }

  } catch (error) {

    return res.status(500).send("Internal Server error occured");
  }

});

app.get("/:filePath", function (req, res) {
  const path = `.${req.params.filePath.split("slash").join("/")}`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});
app.listen(3000, () => {
  console.log("Server is listening on PORT=3000");
});
