import handler from "../../../lib/api/handler";
import { prisma } from "../../../lib/db";

let posts = [];
let postCount = 0;
const api = handler();

api.get(async (req, res) => {
  const { isfirst, take, cursor, tagSlug, postId, type } = req.body;
  switch (type) {
    case "related":
      res.status(200).send(await relatedPosts(tagSlug, postId, take));
      break;
    case "latest":
      res.status(200).send(await latestPosts(isfirst, take, cursor));
      break;
    case "mostLiked":
      res.status(200).send(await mostLikedPosts(isfirst, take, cursor));
      break;
    case "mostViewed":
      res.status(200).send(await mostViewedPosts(isfirst, take, cursor));
      break;
    case "mostTalked":
      res.status(200).send(await mostTalkedPosts(isfirst, take, cursor));
      break;
  }
});

export default api;

async function relatedPosts(tagSlug: string, postId: string, take: number) {
  if (!tagSlug || !postId || !take) throw new Error("Veri eklenmemiş.");
  posts = await prisma.post.findMany({
    take: take,
    where: {
      tags: {
        some: {
          slug: {
            equals: tagSlug,
          },
        },
      },
      state: "PUBLISHED",
      NOT: {
        id: postId,
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
  return posts;
}

async function latestPosts(isfirst: boolean, take: number, cursor: string) {
  if (!cursor || !take) throw new Error("Veri eklenmemiş.");

  if (!isfirst)
    posts = await prisma.post.findMany({
      take: take,
      skip: 1,
      cursor: { id: cursor },
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
  postCount = await prisma.post.count({
    where: {
      state: "PUBLISHED",
    },
  });
  return { posts, postCount };
}

async function mostLikedPosts(isfirst: boolean, take: number, cursor: string) {
  if (!cursor || !take) throw new Error("Veri eklenmemiş.");

  if (!isfirst)
    posts = await prisma.post.findMany({
      take: take,
      skip: 1,
      cursor: { id: cursor },
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
        postLikes: {
          _count: "desc",
        },
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
        postLikes: {
          _count: "desc",
        },
      },
    });
  postCount = await prisma.post.count({
    where: {
      state: "PUBLISHED",
    },
  });
  return { posts, postCount };
}

async function mostTalkedPosts(isfirst: boolean, take: number, cursor: string) {
  if (!cursor || !take) throw new Error("Veri eklenmemiş.");

  if (!isfirst)
    posts = await prisma.post.findMany({
      take: take,
      skip: 1,
      cursor: { id: cursor },
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
        comments: {
          _count: "desc",
        },
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
        comments: {
          _count: "desc",
        },
      },
    });

  postCount = await prisma.post.count({
    where: {
      state: "PUBLISHED",
    },
  });
  return { posts, postCount };
}

async function mostViewedPosts(isfirst: boolean, take: number, cursor: string) {
  if (!cursor || !take) throw new Error("Veri eklenmemiş.");

  if (!isfirst)
    posts = await prisma.post.findMany({
      take: take,
      skip: 1,
      cursor: { id: cursor },
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
        postViews: {
          _count: "desc",
        },
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
        postViews: {
          _count: "desc",
        },
      },
    });
  postCount = await prisma.post.count({
    where: {
      state: "PUBLISHED",
    },
  });
  return { posts, postCount };
}
