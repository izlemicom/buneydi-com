// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "../../../lib/db";
import authorize from "../../../lib/api/authorize";
import authorizeAuthor from "../../../lib/api/authorizeauthor";

import handler from "../../../lib/api/handler";

const api = handler();

api.use(authorize);
api.use(authorizeAuthor);

api.get(async (req, res) => {
  const { userId } = req.query;
  if (!userId) throw new Error("Kullanıcı bilgileri hatalı");

  const user = await prisma.user.findUnique({
    where: {
      id: userId.toString(),
    },
    select: {
      id: true,
      name: true,
      mahlas: true,
      bio: true,
      adress: true,
      city: true,
      country: true,
      postalCode: true,
      image: true,
      iban: true,
    },
  });
  res.status(200).json(user);
});

export default api;
