import handler from "../../../lib/api/handler";
import { prisma } from "../../../lib/db";

let posts = [];
let postCount = 0;
const api = handler();

api.get(async (req, res) => {
  console.log(req.query);
  let { isfirst, take, cursor, type, tagSlug } = req.query;
  console.log(req.query);
  switch (type) {
    case "latest":
      res.status(200).send(await latestPosts(isfirst, take, cursor, tagSlug));
      break;
    case "mostLiked":
      res
        .status(200)
        .send(await mostLikedPosts(isfirst, take, cursor, tagSlug));
      break;
    case "mostViewed":
      res
        .status(200)
        .send(await mostViewedPosts(isfirst, take, cursor, tagSlug));
      break;
    case "mostTalked":
      res
        .status(200)
        .send(await mostTalkedPosts(isfirst, take, cursor, tagSlug));
      break;
  }
});

export default api;

async function latestPosts(isfirst, take, cursor, tagSlug) {
  if (!cursor || !take) throw new Error("Veri eklenmemiş.");

  if (!isfirst)
    posts = await prisma.post.findMany({
      take: parseInt(take.toString()),
      skip: 1,
      cursor: { id: cursor.toString() },
      where: {
        tags: {
          some: {
            slug: {
              equals: tagSlug.toString(),
            },
          },
        },
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
        tags: {
          where: {
            slug: {
              equals: tagSlug.toString(),
            },
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
        tags: {
          some: {
            slug: {
              equals: tagSlug.toString(),
            },
          },
        },
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
        tags: {
          where: {
            slug: {
              equals: tagSlug.toString(),
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  postCount = await prisma.post.count({
    where: {
      tags: {
        some: {
          slug: {
            equals: tagSlug.toString(),
          },
        },
      },
    },
  });
  console.log({ tag: posts[0].tags[0], postCount });
  return { tag: posts[0].tags[0], posts, postCount };
}

async function mostLikedPosts(isfirst, take, cursor, tagSlug) {
  if (!cursor || !take) throw new Error("Veri eklenmemiş.");

  if (!isfirst)
    posts = await prisma.post.findMany({
      take: parseInt(take.toString()),
      skip: 1,
      cursor: { id: cursor.toString() },
      where: {
        tags: {
          some: {
            slug: {
              equals: tagSlug.toString(),
            },
          },
        },
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
        tags: {
          where: {
            slug: {
              equals: tagSlug.toString(),
            },
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
        tags: {
          some: {
            slug: {
              equals: tagSlug.toString(),
            },
          },
        },
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
        tags: {
          where: {
            slug: {
              equals: tagSlug.toString(),
            },
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
      tags: {
        some: {
          slug: {
            equals: tagSlug.toString(),
          },
        },
      },
    },
  });
  console.log({ tag: posts[0].tags[0], postCount });

  return { tag: posts[0].tags[0], posts, postCount };
}

async function mostTalkedPosts(isfirst, take, cursor, tagSlug) {
  if (!cursor || !take) throw new Error("Veri eklenmemiş.");

  if (!isfirst)
    posts = await prisma.post.findMany({
      take: parseInt(take.toString()),
      skip: 1,
      cursor: { id: cursor.toString() },
      where: {
        tags: {
          some: {
            slug: {
              equals: tagSlug.toString(),
            },
          },
        },
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
        tags: {
          where: {
            slug: {
              equals: tagSlug.toString(),
            },
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
        tags: {
          some: {
            slug: {
              equals: tagSlug.toString(),
            },
          },
        },
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
        tags: {
          where: {
            slug: {
              equals: tagSlug.toString(),
            },
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
      tags: {
        some: {
          slug: {
            equals: tagSlug.toString(),
          },
        },
      },
    },
  });
  console.log({ tag: posts[0].tags[0], postCount });

  return { tag: posts[0].tags[0], posts, postCount };
}

async function mostViewedPosts(isfirst, take, cursor, tagSlug) {
  if (!cursor || !take) throw new Error("Veri eklenmemiş.");

  if (!isfirst)
    posts = await prisma.post.findMany({
      take: parseInt(take.toString()),
      skip: 1,
      cursor: { id: cursor.toString() },
      where: {
        tags: {
          some: {
            slug: {
              equals: tagSlug.toString(),
            },
          },
        },
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
        tags: {
          where: {
            slug: {
              equals: tagSlug.toString(),
            },
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
        tags: {
          some: {
            slug: {
              equals: tagSlug.toString(),
            },
          },
        },
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
        tags: {
          where: {
            slug: {
              equals: tagSlug.toString(),
            },
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
      tags: {
        some: {
          slug: {
            equals: tagSlug.toString(),
          },
        },
      },
    },
  });
  console.log({ tag: posts[0].tags[0], postCount });

  return { tag: posts[0].tags[0], posts, postCount };
}
