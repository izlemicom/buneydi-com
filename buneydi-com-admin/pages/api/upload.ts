import nextConnect from "next-connect";
import multer from "multer";
import cuuid from "../../lib/cuuid";
import path from "path";
import { getSession } from "next-auth/client";

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

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Bir şeyler ters gitti! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Metoda '${req.method}' izin verilmiyor` });
  },
});
apiRoute.use(upload.single("upload"));

apiRoute.post((req, res) => {
  res.status(200).json({
    url: "/images/" + fileName,
  });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
