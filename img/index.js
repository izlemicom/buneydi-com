const fs = require("fs");
var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());

app.get("/:image", (req, res) => {
  var image = "../api/public/images" + `/${req.params.image}`;

  try {
    if (fs.existsSync(image)) {
      const stream = fs.createReadStream(image);
      stream.pipe(res);
    } else {
      res.end(`${req.params.image} bulunamadi.`);
    }
  } catch (e) {
    console.error(e);
  }
});

app.listen(3006, "localhost", () => {
  console.log("Server başladı");
});
