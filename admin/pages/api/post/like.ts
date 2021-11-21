import authorize from "../../../lib/api/authorize";
import handler from "../../../lib/api/handler";
import { prisma } from "../../../lib/db";

const api = handler();
api.use(authorize);

api.get(async (req, res) => {
  const { userId, postId } = req.query;
  if (!userId || !postId) throw new Error("Veri eklenmemiş.");
  const like = await prisma.postLike.findFirst({
    where: {
      user: {
        id: {
          equals: userId.toString(),
        },
      },
      post: {
        id: {
          equals: postId.toString(),
        },
      },
    },
  });
  return res.status(200).json(like);
});

api.post(async (req, res) => {
  const { userId, postId } = req.body;
  if (!userId || !postId) throw new Error("Veri eklenmemiş.");
  let like;
  const isLike = await prisma.postLike.findFirst({
    where: {
      user: {
        id: {
          equals: userId.toString(),
        },
      },
      post: {
        id: {
          equals: postId.toString(),
        },
      },
    },
  });

  if (!isLike) {
    like = await prisma.postLike.create({
      data: {
        userId: userId.toString(),
        postId: postId.toString(),
      },
    });
    res.status(200).json(like);
  } else {
    throw new Error("Zaten beğenilmiş.");
  }
});

api.delete(async (req, res) => {
  const { likeId } = req.body;
  if (!likeId) throw new Error("Veri eklenmemiş.");

  const isLike = await prisma.postLike.findUnique({
    where: {
      id: likeId.toString(),
    },
  });
  if (isLike) {
    const like = await prisma.postLike.delete({
      where: {
        id: likeId.toString(),
      },
    });

    res.status(200).json(like);
  } else {
    throw new Error("Zaten beğenilmemiş.");
  }
});

export default api;
