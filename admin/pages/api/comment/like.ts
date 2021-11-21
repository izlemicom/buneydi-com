import authorize from "../../../lib/api/authorize";
import handler from "../../../lib/api/handler";
import { prisma } from "../../../lib/db";

const api = handler();
api.use(authorize);

api.get(async (req, res) => {
  const { userId, commentId } = req.query;
  if (!userId || !commentId) throw new Error("Veri eklenmemiş.");
  const like = await prisma.commentLike.findFirst({
    where: {
      user: {
        id: {
          equals: userId.toString(),
        },
      },
      comment: {
        id: {
          equals: commentId.toString(),
        },
      },
    },
  });

  return res.status(200).json(like);
});

api.post(async (req, res) => {
  const { userId, commentId } = req.body;
  if (!userId || !commentId) throw new Error("Veri eklenmemiş.");
  let like;

  const isLike = await prisma.commentLike.findFirst({
    where: {
      user: {
        id: {
          equals: userId.toString(),
        },
      },
      comment: {
        id: {
          equals: commentId.toString(),
        },
      },
    },
  });

  if (!isLike) {
    like = await prisma.commentLike.create({
      data: {
        userId: userId.toString(),
        commentId: commentId.toString(),
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

  const isLike = await prisma.commentLike.findUnique({
    where: {
      id: likeId.toString(),
    },
  });
  if (isLike) {
    const like = await prisma.commentLike.delete({
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
