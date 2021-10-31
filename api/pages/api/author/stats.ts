// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "../../../lib/db";
import { getAllDaysFrom } from "../../../lib/week";

import authorize from "../../../lib/api/authorize";
import authorizeAuthor from "../../../lib/api/authorizeauthor";
import handler from "../../../lib/api/handler";

handler.use(authorize);
handler.use(authorizeAuthor);

handler.get(async (req, res) => {
  const { userId, days } = req.body;
  if (!userId && !days)
    res.status(400).json({ err: "Kullanıcı bilgileri hatalı" });

  const list = getAllDaysFrom(days);

  let fviewCountValues: Array<number> = [];
  let fcommentCountValues: Array<number> = [];
  let flikeCountValues: Array<number> = [];
  let sviewCountValues: Array<number> = [];
  let scommentCountValues: Array<number> = [];
  let slikeCountValues: Array<number> = [];

  for (let index = 0; index < list.length; index++) {
    const firstDate = list[index];
    let lastDate = list[index + 1];
    if (!lastDate) lastDate = new Date().toISOString();

    const viewCountWeek = await prisma.postViews.count({
      where: {
        user: {
          id: userId,
        },
        createdAt: {
          gte: new Date(firstDate),
          lt: new Date(lastDate),
        },
      },
    });

    const commentCountWeek = await prisma.comment.count({
      where: {
        post: {
          user: {
            id: userId,
          },
        },
        createdAt: {
          gte: new Date(firstDate),
          lt: new Date(lastDate),
        },
      },
    });

    const likeCountWeek = await prisma.postLike.count({
      where: {
        post: {
          user: {
            id: userId,
          },
        },
        createdAt: {
          gte: new Date(firstDate),
          lt: new Date(lastDate),
        },
      },
    });
    if (index < 7) {
      fviewCountValues.push(viewCountWeek);
      fcommentCountValues.push(commentCountWeek);
      flikeCountValues.push(likeCountWeek);
    } else {
      sviewCountValues.push(viewCountWeek);
      scommentCountValues.push(commentCountWeek);
      slikeCountValues.push(likeCountWeek);
    }
  }

  const viewCountTotal = await prisma.postViews.count({
    where: {
      user: {
        id: userId,
      },
    },
  });

  const commentCountTotal = await prisma.comment.count({
    where: {
      post: {
        user: {
          id: userId,
        },
      },
    },
  });

  const likeCountTotal = await prisma.postLike.count({
    where: {
      post: {
        user: {
          id: userId,
        },
      },
    },
  });
  const postCountTotal = await prisma.post.count({
    where: {
      user: {
        id: userId,
      },
    },
  });
  res.status(200).json({
    total: {
      postCount: postCountTotal,
      viewCount: viewCountTotal,
      commentCount: commentCountTotal,
      likeCount: likeCountTotal,
    },
    firstWeek: {
      viewCount: fviewCountValues,
      commentCount: fcommentCountValues,
      likeCount: flikeCountValues,
    },
    lastWeek: {
      viewCount: sviewCountValues,
      commentCount: scommentCountValues,
      likeCount: slikeCountValues,
    },
  });
});

export default handler;
