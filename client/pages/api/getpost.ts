import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/db";

export default async function getPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (!req.query.slug)
      return res.status(400).json({ err: "Slug eklenmemiş." });

    const post = await prisma.post.findUnique({
      where: {
        slug: req.query.slug.toString(),
      },
      include: {
        _count: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        tags: {
          select: {
            id: true,
            content: true,
            slug: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    res.status(200).json(post);
  } else res.status(400).json({ err: "Gönderim metodu yanlış." });
}
