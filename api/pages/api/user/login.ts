import handler from "../../../lib/api/handler";
import CryptoJS from "crypto-js";
import { prisma } from "../../../lib/db";

const api = handler();

api.post(async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) throw new Error("Veri eklenmemiş.");
  const user = await prisma.user.findUnique({ where: { email: username } });
  if (!user) throw new Error("Kaydınız bulunmamaktadır.");
  const result = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
  console.log(result);
  const pass = result.toString(CryptoJS.enc.Utf8);
  console.log(pass);
  if (password !== pass) throw new Error("E-posta veya şifre hatalı.");
  console.log(user);
  res.status(200).json(user);
});

export default api;
