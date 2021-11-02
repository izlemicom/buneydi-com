import multer from "multer";
import cuuid from "../../../lib/cuuid";
import path from "path";
import authorize from "../../../lib/api/authorize";
import authorizeAuthor from "../../../lib/api/authorizeauthor";
import handler from "../../../lib/api/handler";
const api = handler();

let fileName = "";
function isFileImage(file) {
  return file && file.mimetype.split("/")[0] === "image";
}

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/images",
    filename: function (req, file, cb) {
      if (!isFileImage(file))
        return cb(new Error("Sadece fotoğraf yükleyebilirsiniz."));
      const uniqueSuffix = cuuid();
      fileName = "image" + "-" + uniqueSuffix + path.extname(file.originalname);
      cb(null, fileName);
    },
  }),
});

api.use(authorize);
api.use(authorizeAuthor);
api.use(upload.single("upload"));

api.post((req, res) => {
  res.status(200).json({
    url: process.env.BASE_IMAGE_URL + "/images/" + fileName,
  });
});

export default api;

export const config = {
  api: {
    bodyParser: false,
  },
};
