import multer from "multer";
import cuuid from "../../../lib/cuuid";
import path from "path";
import authorize from "../../../lib/api/authorize";
import authorizeAuthor from "../../../lib/api/authorizeauthor";
import handler from "../../../lib/api/handler";
import { prisma } from "../../../lib/db";
import { unlink } from "fs/promises";
import imagemin from "imagemin";
import imageminPngquant from "imagemin-pngquant";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminGiflossy from "imagemin-giflossy";
import imageminWebp from "imagemin-webp";
import imageminSvgo from "imagemin-svgo";

import { NextApiRequest } from "next";

export interface ImageRequest extends NextApiRequest {
  id: string | null;
  file: {
    fieldname: string | null;
    originalname: string | null;
    encoding: string | null;
    mimetype: string | null;
    destination: string | null;
    filename: string | null;
    path: string | null;
    size: number | null;
  } | null;
}

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

api.use(upload.single("upload"));

api.post(async (req: ImageRequest, res) => {
  let fName = req.file.filename;
  if (req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png") {
    const files = await imagemin([`${req.file.path}`], {
      destination: `${req.file.destination}`,
      plugins: [
        imageminMozjpeg({ quality: 80 }),
        imageminPngquant({
          quality: [0.8, 0.9],
        }),
        imageminGiflossy({ lossy: 80 }),
        imageminWebp({ quality: 80 }),
        imageminSvgo({
          plugins: [
            {
              name: "removeViewBox",
              active: false,
            },
          ],
        }),
      ],
    });
    try {
      await unlink(`./public/images/${req.file.filename}`);
    } catch (error) {
      throw new Error("Bir şeyler ters gitti." + error);
    }
    const arr = files[0].destinationPath.toString().split("/");
    const newName = arr[arr.length - 1];
    fName = newName;
  }
  if (
    req.file.mimetype === "image/gif" ||
    req.file.mimetype === "image/svg+xml" ||
    req.file.mimetype === "image/webp"
  ) {
    const files = await imagemin([`${req.file.path}`], {
      destination: `${req.file.destination}`,
      plugins: [
        imageminMozjpeg({ quality: 50 }),
        imageminPngquant({
          quality: [0.5, 0.6],
        }),
        imageminGiflossy({ lossy: 50 }),
        imageminWebp({ quality: 50 }),
        imageminSvgo({
          plugins: [
            {
              name: "removeViewBox",
              active: false,
            },
          ],
        }),
      ],
    });
  }
  const uploadedImage = await prisma.image.create({
    data: {
      id: fName.split(".")[0],
      url: fName,
      addedBy: {
        connect: {
          id: req.id,
        },
      },
    },
  });
  res.status(200).json({
    url: process.env.BASE_IMAGE_URL + fName,
  });
});

api.use(authorizeAuthor);

api.delete(async (req, res) => {
  const { url } = req.query;
  const arr = url.toString().split("/");
  const file = arr[arr.length - 1];
  try {
    await unlink(`./public/images/${file}`);
  } catch (error) {
    throw new Error("Bir şeyler ters gitti." + error);
  }
  const deletedImage = await prisma.image.delete({
    where: {
      url: file,
    },
  });
  res.status(200).json({ success: "Başarılı bir şekilde silindi." });
});

export default api;

export const config = {
  api: {
    bodyParser: false,
  },
};
