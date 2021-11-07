// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "../../../lib/db";
import authorize from "../../../lib/api/authorize";
import authorizeAuthor from "../../../lib/api/authorizeauthor";

import handler from "../../../lib/api/handler";
const api = handler();

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
      image: true,
      city: true,
      mahlas: true,
      bio: true,
    },
  });

  const viewCountTotal = await prisma.postViews.count({
    where: {
      user: {
        id: userId.toString(),
      },
    },
  });

  const commentCountTotal = await prisma.comment.count({
    where: {
      post: {
        user: {
          id: userId.toString(),
        },
      },
    },
  });

  const likeCountTotal = await prisma.postLike.count({
    where: {
      post: {
        user: {
          id: userId.toString(),
        },
      },
    },
  });
  const postCountTotal = await prisma.post.count({
    where: {
      user: {
        id: userId.toString(),
      },
    },
  });
  res.status(200).json({
    total: {
      postCount: postCountTotal,
      viewCount: viewCountTotal,
      commentCount: commentCountTotal,
      likeCount: likeCountTotal,
    },
    user: user,
  });
});
api.use(authorize);
api.use(authorizeAuthor);
api.patch(async (req, res) => {
  const {
    userId,
    userName,
    mahlas,
    name,
    adress,
    city,
    country,
    postalCode,
    iban,
    bio,
  } = req.body;
  if (!userId) throw new Error("Veri eklenmemiş.");
  const updatedUser = await prisma.user.update({
    where: { id: userId.toString() },
    data: {
      userName: userName,
      mahlas: mahlas,
      name: name,
      adress: adress,
      city: city,
      country: country,
      postalCode: postalCode,
      iban: iban,
      bio: bio,
    },
  });
  res.status(200).json(updatedUser);
});

export default api;
