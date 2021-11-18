// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "../../../lib/db";
import authorize from "../../../lib/api/authorize";
import authorizeAuthor from "../../../lib/api/authorizeauthor";

import handler from "../../../lib/api/handler";
import CryptoJS from "crypto-js";
import axios from "axios";

const api = handler();

api.use(authorize);
api.use(authorizeAuthor);

api.patch(async (req, res) => {
  const { userId, password, token } = req.body;
  if (!password) throw new Error("Veri eklenmemiş.");
  if (!userId) throw new Error("Kullanıcı bilgileri hatalı");

  const response: any = await axios({
    params: {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
    },
    method: "POST",
    baseURL: "https://www.google.com",
    url: "/recaptcha/api/siteverify",
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (err) {
      const error = err.response.data.error;
      console.error(error);
      throw new Error(error);
    });
  console.log(response);
  if (!response.success) throw new Error("Çok fazla giriş yaptınız.");

  var hash = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
  const user = await prisma.user.update({
    where: {
      id: userId.toString(),
    },
    data: {
      password: hash.toString(),
    },
  });
  res.status(200).json(user);
});

export default api;
