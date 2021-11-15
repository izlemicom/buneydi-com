import { unlink } from "fs/promises";
import { prisma } from "../../../lib/db";
import handler from "../../../lib/api/handler";
import slugGenerator from "../../../lib/slugGenerator";
import authorize from "../../../lib/api/authorize";
import authorizeAuthor from "../../../lib/api/authorizeauthor";
const api = handler();

api.get(async (req, res) => {
  const { slug } = req.query;
  if (!slug) throw new Error("Veri eklenmemiş.");

  const post = await prisma.post.findUnique({
    where: {
      slug: slug.toString(),
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
});

api.use(authorize);
api.use(authorizeAuthor);

api.post(async (req, res) => {
  const { title, content, mainImage, tags, userId } = req.body;

  if (!title || !content || !mainImage || !userId)
    throw new Error("Veri eklenmemiş.");

  let tagArray = tags.toLowerCase().split(",");
  let slug = slugGenerator(title);
  const findSlug = await prisma.post.findUnique({
    where: { slug: slug },
    select: { slug: true },
  });
  if (findSlug) slug = slug + "-" + Math.floor(Math.random() * 1000000 + 1);

  const post = await prisma.post.create({
    data: {
      title: title,
      content: content,
      slug: slug,
      state: "PUBLISHED",
      mainImage: mainImage,
      user: {
        connect: {
          id: userId,
        },
      },
    },
    select: { slug: true, id: true },
  });

  const promises = tagArray.map((tag) => {
    const slug = slugGenerator(tag);
    if (!slug) return;
    const findSlug = prisma.tag
      .findUnique({
        where: { slug: slug },
      })
      .then((findSlug) => {
        if (findSlug) {
          const updated = prisma.tag
            .update({
              where: { slug: slug },
              data: {
                posts: {
                  connect: {
                    id: post.id,
                  },
                },
              },
            })
            .then((data) => {
              return data;
            });
          return updated;
        } else {
          const added = prisma.tag
            .create({
              data: {
                content: tag,
                slug: slug,
                createdBy: {
                  connect: {
                    id: userId,
                  },
                },
                posts: {
                  connect: {
                    id: post.id,
                  },
                },
              },
            })
            .then((data) => {
              return data;
            });
          return added;
        }
      });
    console.log(findSlug);
  });
  await Promise.all(promises).then(function (results) {});
  res.status(200).json(post);
});

api.patch(async (req, res) => {
  const { title, content, mainImage, tags, userId, id } = req.body;

  if (!title || !content || !mainImage || !userId || !id)
    throw new Error("Veri eklenmemiş.");

  let tagArray = tags.toLowerCase().split(",");
  let slug = slugGenerator(title);
  const findSlug = await prisma.post.findUnique({
    where: { id: id },
    select: { slug: true },
  });
  if (!findSlug) throw new Error("İçerik bulunamadı.");

  const post = await prisma.post.update({
    where: { id: id },
    data: {
      title: title,
      content: content,
      slug: slug,
      state: "PUBLISHED",
      mainImage: mainImage,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  const promises = tagArray.map((tag) => {
    const slug = slugGenerator(tag);
    if (!slug) return;
    const findSlug = prisma.tag
      .findUnique({
        where: { slug: slug },
      })
      .then((findSlug) => {
        if (findSlug) {
          const updated = prisma.tag
            .update({
              where: { slug: slug },
              data: {
                posts: {
                  connect: {
                    id: post.id,
                  },
                },
              },
            })
            .then((data) => {
              return data;
            });
          return updated;
        } else {
          const added = prisma.tag
            .create({
              data: {
                content: tag,
                slug: slug,
                createdBy: {
                  connect: {
                    id: userId,
                  },
                },
                posts: {
                  connect: {
                    id: post.id,
                  },
                },
              },
            })
            .then((data) => {
              return data;
            });
          return added;
        }
      });
    console.log(findSlug);
  });
  await Promise.all(promises).then(function (results) {});
  res.status(200).json(post);
});
api.delete(async (req, res) => {
  const { postId } = req.body;
  if (!postId) throw new Error("Veri eklenmemiş.");
  const postViews = await prisma.postViews.deleteMany({
    where: { postId: postId },
  });
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    select: {
      id: true,
    },
  });
  const commentLikes = comments?.map((comment) => {
    const deleted = prisma.commentLike
      .deleteMany({
        where: { commentId: comment.id },
      })
      .then((data) => {
        return data;
      });
  });
  await Promise.all(commentLikes).then(function (response) {});
  const deletedcomments = await prisma.comment.deleteMany({
    where: { postId: postId },
  });
  const postLikes = await prisma.postLike.deleteMany({
    where: { postId: postId },
  });
  const post = await prisma.post.delete({
    where: { id: postId },
  });
  const url = post.mainImage;
  const arr = url.split("/");
  const file = arr[arr.length - 1];
  try {
    await unlink(`./public/images/${file}`);
  } catch (error) {
    throw new Error(error);
  }
  res.status(200).json(post);
});
export default api;
