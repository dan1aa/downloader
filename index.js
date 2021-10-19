const http = require("http");
const path = require('path')
const fs = require('fs')
const archiver = require('archiver')
const https = require('https')
const directory = `${process.env.HOME}\\\Downloads`;

let server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.end("Home page");
  } 
  else if (req.method === "GET" && req.url.includes("/download")) {
    let currentURL = new URL(`http://localhost:3000${req.url}`);
    let fileURL = currentURL.searchParams.get("url");
    let fileName = fileURL.split("/").slice(-1).toString();
    let fileWriteStream = fs.createWriteStream(directory + "\\" + fileName)
    let zipWriteStream = fs.createWriteStream(directory + "\\" + `${fileName}.zip`)
    const archive = archiver('zip', {
      zlib: {
        level: 9
      }
    })
    let request = https.get(fileURL, (img) => {
      img.pipe(fileWriteStream)
      archive.pipe(zipWriteStream)
      archive.append(fs.createReadStream(directory + "\\" + fileName), {name: fileName})
      archive.finalize()
    })
    res.end()
  }
})

server.listen(3000, () => {
    console.log('listened');
})