import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/db";

export default async function getPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    res.status(400).json({ err: "Gönderim metodu yanlış." });
  if (!req.query.slug) return res.status(400).json({ err: "Slug eklenmemiş." });

  const posts = await prisma.post.findMany({
    take: 6,
    where: {
      tags: {
        some: {
          slug: {
            equals: req.query.slug.toString(),
          },
        },
      },
      state: "PUBLISHED",
      NOT: {
        id: req.query.postid.toString(),
      },
    },
    select: {
      id: true,
      slug: true,
      title: true,
    },
    orderBy: {
      postViews: {
        _count: "desc",
      },
    },
  });
  res.status(200).json(posts);
}
