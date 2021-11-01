import { prisma } from "../../../lib/db";

import handler from "../../../lib/api/handler";
const api = handler();

api.get(async (req, res) => {
  const { take, cursor, postId, isfirst } = req.body;

  if (!take || !postId || !cursor) throw new Error("Veri eklenmemiş.");
  let comments;

  if (!isfirst)
    comments = await prisma.comment.findMany({
      take: take,
      skip: 1,
      cursor: { id: cursor },
      where: {
        postId: postId,
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
      orderBy: [
        {
          commentLikes: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });
  if (isfirst)
    comments = await prisma.comment.findMany({
      take: take,
      where: {
        postId: postId,
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
      orderBy: [
        {
          commentLikes: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });
  return res.status(200).json(comments);
});

export default api;
