import handler from "../../../lib/api/handler";

let posts = [];
let postCount = 0;

handler.get(async (req, res) => {});

export default handler;

async function relatedPosts(tagSlug: string, postId: string) {
  posts = await prisma.post.findMany({
    take: 6,
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
}

async function latestPosts(isfirst: boolean, take: number, cursor: string) {
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
}

async function mostLikedPosts(isfirst: boolean, take: number, cursor: string) {
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
}

async function mostTalkedPosts(isfirst: boolean, take: number, cursor: string) {
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
}

async function mostViewedPosts(isfirst: boolean, take: number, cursor: string) {
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
}
