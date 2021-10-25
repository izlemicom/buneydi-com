import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/db";

export default async function getAuthors(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(400).json({ err: "Gönderim metodu yanlış." });

  const { a, cursor, isfirst } = req.query;
  const b = a.toString();
  const take = parseInt(b);
  if (!take) return res.status(400).json({ err: "Slug eklenmemiş." });
  let authors;
  if (!isfirst && !cursor)
    return res.status(400).json({ err: "Slug eklenmemiş." });
  if (!isfirst)
    authors = await prisma.user.findMany({
      take: take,
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
      take: take,
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
}
