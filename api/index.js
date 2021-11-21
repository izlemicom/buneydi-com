var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());

app.get("/:image", (req, res) => {});

app.listen(3007, "localhost", () => {
  console.log("Server başladı");
});
