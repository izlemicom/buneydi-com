import { prisma } from "../../../lib/db";

import authorize from "../../../lib/api/authorize";
import handler from "../../../lib/api/handler";

handler.use(authorize);

handler.post(async (req, res) => {
  const { content, postId, userId } = req.body;
  if (!content && !postId && !userId) new Error("Slug eklenmemiş.");
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
});

export default handler;
