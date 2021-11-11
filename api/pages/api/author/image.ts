// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "../../../lib/db";
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
  const user = await prisma.user.update({
    where: {
      id: userId.toString(),
    },
    data: {
      image: image,
    },
  });
  res.status(200).json(user);
});

export default api;
