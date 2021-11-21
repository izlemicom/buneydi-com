import { prisma } from "../../../lib/db";

import authorize from "../../../lib/api/authorize";
import handler from "../../../lib/api/handler";
import axios from "axios";

const api = handler();

api.use(authorize);

api.post(async (req, res) => {
  const { content, postId, userId, token } = req.body;
  if (!content || !postId || !userId) throw new Error("Veri eklenmemiş.");

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

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
    },
  });
  const comment = await prisma.comment.create({
    data: {
      content: content,
      post: {
        connect: {
          id: postId,
        },
      },
      user: {
        connect: {
          id: user.id,
        },
      },
    },
    select: {
      _count: true,
      id: true,
      content: true,
      createdAt: true,
      user: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
  res.status(200).json(comment);
});

export default api;
