import { prisma } from "../../../lib/db";

import handler from "../../../lib/api/handler";
const api = handler();

api.get(async (req, res) => {
  const { take, cursor, isfirst } = req.query;

  if (!take || !cursor) throw new Error("Veri eklenmemiş.");

  let authors;

  if (!isfirst)
    authors = await prisma.user.findMany({
      take: parseInt(take.toString()),
      skip: 1,
      cursor: { id: cursor.toString() },
      where: {
        role: "AUTHOR",
      },
      select: {
        _count: {
          select: {
            posts: true,
          },
        },
        id: true,
        name: true,
        image: true,
      },
      orderBy: [
        {
          posts: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });
  if (isfirst)
    authors = await prisma.user.findMany({
      take: parseInt(take.toString()),
      where: {
        role: "AUTHOR",
      },
      select: {
        _count: {
          select: {
            posts: true,
          },
        },
        id: true,
        name: true,
        image: true,
      },
      orderBy: [
        {
          posts: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });
  const authorCount = await prisma.user.count({
    where: {
      role: "AUTHOR",
    },
  });
  return res.status(200).json({ authors, authorCount });
});

export default api;
