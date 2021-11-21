import { prisma } from "../../../lib/db";
import handler from "../../../lib/api/handler";

let authors;

const api = handler();

api.get(async (req, res) => {
  const { take, cursor, isfirst, type } = req.query;
  if (type) return res.status(200).json(await allAuthors());
  return res.status(200).json(await someAuthors(take, cursor, isfirst));
});

export default api;

async function allAuthors() {
  authors = await prisma.user.findMany({
    where: { role: "AUTHOR" },
    select: {
      id: true,
    },
  });
  return authors;
}

async function someAuthors(take, cursor, isfirst) {
  if (!take || !cursor) throw new Error("Veri eklenmemiş.");

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
  return { authors, authorCount };
}
