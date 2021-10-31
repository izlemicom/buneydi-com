import { prisma } from "../../../lib/db";

import handler from "../../../lib/api/handler";

handler.get(async (req, res) => {
  const { a, cursor, postid, isfirst } = req.body;
  const b = a.toString();
  const take = parseInt(b);
  if (!take && !postid)
    return res.status(400).json({ err: "Slug eklenmemiş." });
  let comments;
  if (!isfirst && !cursor)
    return res.status(400).json({ err: "Slug eklenmemiş." });
  if (!isfirst)
    comments = await prisma.comment.findMany({
      take: take,
      skip: 1,
      cursor: { id: cursor.toString() },
      where: {
        postId: postid.toString(),
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
        postId: postid.toString(),
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

export default handler;
