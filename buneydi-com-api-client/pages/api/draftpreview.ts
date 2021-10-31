import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/db";

export default async function draftPreview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.body;
    if (!id) return res.status(400).json({ err: "Id eklenmemiş." });

    const post = await prisma.post.findUnique({
      where: {
        id: id,
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
