import handler from "../../../lib/api/handler";
import CryptoJS from "crypto-js";
import { prisma } from "../../../lib/db";

const api = handler();

api.post(async (req, res) => {
  const { username, password, name } = req.body;
  if (!username || !password || !name) throw new Error("Veri eklenmemiş.");

  const user = await prisma.user.findUnique({ where: { email: username } });
  if (user) throw new Error("Daha önceden kayıt yapılmış.");
  var hash = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
  console.log(hash);
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: username,
      password: hash.toString(),
    },
  });
  res.status(200).json(newUser);
});

export default api;
