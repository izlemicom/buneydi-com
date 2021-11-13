import handler from "../../../lib/api/handler";
import { prisma } from "../../../lib/db";

let posts = [];
let postCount = 0;
const api = handler();

api.get(async (req, res) => {
  let { isfirst, take, cursor, tagSlug, postId, type } = req.query;
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
    case "somePosts":
      res.status(200).send(await somePosts(take));
      break;
    case "allPosts":
      res.status(200).send(await allPosts());
      break;
  }
});

export default api;

async function allPosts() {
  posts = await prisma.post.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  return posts;
}

async function somePosts(take) {
  if (!take) throw new Error("Veri eklenmemiş.");
  postCount = await prisma.post.count({});
  const skip = Math.floor(Math.random() * postCount);
  posts = await prisma.post.findMany({
    skip: skip,
    take: parseInt(take.toString()),
    select: {
      id: true,
      title: true,
      slug: true,
    },
  });

  return posts;
}

async function relatedPosts(tagSlug, postId, take) {
  if (!tagSlug || !postId || !take) throw new Error("Veri eklenmemiş.");
  posts = await prisma.post.findMany({
    take: parseInt(take.toString()),
    where: {
      tags: {
        some: {
          content: {
            search: tagSlug,
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
    orderBy: [
      {
        postViews: {
          _count: "desc",
        },
      },
      {
        createdAt: "desc",
      },
    ],
  });
  return posts;
}

async function latestPosts(isfirst, take, cursor) {
  if (!cursor || !take) throw new Error("Veri eklenmemiş.");

  if (!isfirst)
    posts = await prisma.post.findMany({
      take: parseInt(take.toString()),
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
      take: parseInt(take.toString()),
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

async function mostLikedPosts(isfirst, take, cursor) {
  if (!cursor || !take) throw new Error("Veri eklenmemiş.");

  if (!isfirst)
    posts = await prisma.post.findMany({
      take: parseInt(take.toString()),
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
      orderBy: [
        {
          postLikes: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });
  if (isfirst)
    posts = await prisma.post.findMany({
      take: parseInt(take.toString()),
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
      orderBy: [
        {
          postLikes: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });
  postCount = await prisma.post.count({
    where: {
      state: "PUBLISHED",
    },
  });
  return { posts, postCount };
}

async function mostTalkedPosts(isfirst, take, cursor) {
  if (!cursor || !take) throw new Error("Veri eklenmemiş.");

  if (!isfirst)
    posts = await prisma.post.findMany({
      take: parseInt(take.toString()),
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
      orderBy: [
        {
          comments: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });
  if (isfirst)
    posts = await prisma.post.findMany({
      take: parseInt(take.toString()),
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
      orderBy: [
        {
          comments: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });

  postCount = await prisma.post.count({
    where: {
      state: "PUBLISHED",
    },
  });
  return { posts, postCount };
}

async function mostViewedPosts(isfirst, take, cursor) {
  if (!cursor || !take) throw new Error("Veri eklenmemiş.");

  if (!isfirst)
    posts = await prisma.post.findMany({
      take: parseInt(take.toString()),
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
      orderBy: [
        {
          postViews: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });
  if (isfirst)
    posts = await prisma.post.findMany({
      take: parseInt(take.toString()),
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
      orderBy: [
        {
          postViews: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });
  postCount = await prisma.post.count({
    where: {
      state: "PUBLISHED",
    },
  });
  return { posts, postCount };
}
