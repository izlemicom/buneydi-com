// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "../../../lib/db";
import { unlink } from "fs/promises";

import authorize from "../../../lib/api/authorize";
import authorizeAuthor from "../../../lib/api/authorizeauthor";

import handler from "../../../lib/api/handler";

const api = handler();

api.use(authorize);
api.use(authorizeAuthor);

api.patch(async (req, res) => {
  const { userId, image } = req.body;
  if (!image) throw new Error("Veri eklenmemiş.");
  if (!userId) throw new Error("Kullanıcı bilgileri hatalı");

  const previousImage = await prisma.user
    .findUnique({
      where: {
        id: userId.toString(),
      },
      select: {
        image: true,
      },
    })
    .then((user) => {
      return user.image;
    });

  const user = await prisma.user.update({
    where: {
      id: userId.toString(),
    },
    data: {
      image: image,
    },
  });
  const defaultImage = "default-user-image.webp";
  const arr = previousImage.toString().split("/");
  const file = arr[arr.length - 1];

  if (
    file !== defaultImage &&
    previousImage.includes(process.env.BASE_IMAGE_URL)
  ) {
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
  }
  res.status(200).json(user);
});

export default api;
