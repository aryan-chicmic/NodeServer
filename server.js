const http = require("http");
const fs = require("fs");
const path = require("path");
const directoryPath = "/Users/aryan/Documents/cocos/2023/Learning/TestingBundlesLatestVersion/build/web-mobile/assets/Game1"; // Replace this with your actual directory path

const server = http.createServer((req, res) => {
  // Set CORS headers to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  const filePath = path.join(directoryPath, req.url);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File not found!");
    } else {
      if (stats.isDirectory()) {
        fs.readdir(filePath, (err, files) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal server error!");
          } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            const fileLinks = files.map((file) => `<a href="${req.url}/${file}">${file}</a>`).join("<br>");
            res.end(fileLinks);
          }
        });
      } else {
        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal server error!");
          } else {
            res.writeHead(200, { "Content-Disposition": "attachment" });
            res.end(data);
          }
        });
      }
    }
  });
});

const port = 3000; // Set the port you want to run the server on
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
