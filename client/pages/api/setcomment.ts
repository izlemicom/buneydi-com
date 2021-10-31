import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { prisma } from "../../lib/db";

export default async function setComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({ err: "Gönderim metodu yanlış." });
  const { content, postId, userId } = req.body;
  if (!content && !postId && !userId)
    return res.status(400).json({ err: "Slug eklenmemiş." });
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
    },
  });
  const comment = await prisma.comment.create({
    data: {
      content: content,
      post: {
        connect: {
          id: postId,
        },
      },
      user: {
        connect: {
          id: user.id,
        },
      },
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
  });
  res.status(200).json(comment);
}
