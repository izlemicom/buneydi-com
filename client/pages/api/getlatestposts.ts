import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/db";

export default async function getLatestPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(400).json({ err: "Gönderim metodu yanlış." });

  const { a, cursor, isfirst } = req.query;
  const b = a.toString();
  const take = parseInt(b);
  if (!take) return res.status(400).json({ err: "Slug eklenmemiş." });
  let posts;
  if (!isfirst && !cursor)
    return res.status(400).json({ err: "Slug eklenmemiş." });
  if (!isfirst)
    posts = await prisma.post.findMany({
      take: take,
      skip: 1,
      cursor: { id: cursor.toString() },
      where: {
        state: "PUBLISHED",
      },
      select: {
        id: true,
        slug: true,
        title: true,
        content: true,
        mainImage: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            image: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  if (isfirst)
    posts = await prisma.post.findMany({
      take: take,
      where: {
        state: "PUBLISHED",
      },
      select: {
        id: true,
        slug: true,
        title: true,
        content: true,
        mainImage: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            image: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  const postCount = await prisma.post.count({
    where: {
      state: "PUBLISHED",
    },
  });
  return res.status(200).json({ posts, postCount });
}
