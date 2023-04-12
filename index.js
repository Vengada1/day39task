

const express = require("express");
const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "timestamps");

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// initializing express server
const app = express();

// middlewares
app.use(express.static("timestamps"));

// APIs
app.get("/", (req, res) => {
  res.send("hey ia am there");
});

app.get("/static", (req, res) => {
  let time = new Date();
  let dateString = time.toUTCString().slice(0, -3);
  let content = `Last updated ${dateString}`;

  fs.writeFileSync(`${dirPath}/date-time.txt`, content, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("file created successfully");
    }
  });

  res.sendFile(path.join(__dirname, "timestamps/date-time.txt"));
});

// set server to listen server started in localhost:9000
app.listen(9000, () => console.log(`server started host9000`));
