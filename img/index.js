const fs = require("fs");
var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());
var count = 0;
app.get("/:image", (req, res) => {
  var image = "../api/public/images" + `/${req.params.image}`;

  try {
    if (fs.existsSync(image)) {
      const stream = fs.createReadStream(image);
      count++;
      console.log(count);
      console.log(req.params.image);
      stream.pipe(res);
    } else {
      console.error(`${req.params.image} bulunamadi.`);
      res.end(`${req.params.image} bulunamadi.`);
    }
  } catch (e) {
    console.error(e);
  }
});

app.listen(3006, "localhost", () => {
  console.log("Server başladı");
});
