import qr from 'qr-image';
import fs from 'fs';
import express from "express";
import bodyParser from "body-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.listen(port);
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/index.html")
   
})

function codeGenerator (req,res, next) {
  const url = req.body.url
  var qr_svg = qr.image(url);
  qr_svg.pipe(fs.createWriteStream('qr-code.png'));

  fs.writeFile("url.txt", url, (err) => {
      if (err) throw err;
      console.log('The URL has been saved!');
    }); 
  res.sendFile(__dirname + "/qr-code.png");
}

app.use(codeGenerator)
