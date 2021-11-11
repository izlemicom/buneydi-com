// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "../../../lib/db";
import authorize from "../../../lib/api/authorize";

import handler from "../../../lib/api/handler";
import CryptoJS from "crypto-js";

const api = handler();

api.use(authorize);

api.patch(async (req, res) => {
  const { userId, password, name } = req.body;
  if (!password || !name) throw new Error("Veri eklenmemiş.");
  if (!userId) throw new Error("Kullanıcı bilgileri hatalı");
  var hash = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
  const user = await prisma.user.update({
    where: {
      id: userId.toString(),
    },
    data: {
      password: hash.toString(),
      name: name,
    },
  });
  res.status(200).json(user);
});

export default api;
