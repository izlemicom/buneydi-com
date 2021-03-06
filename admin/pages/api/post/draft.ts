import { prisma } from "../../../lib/db";
import { unlink } from "fs/promises";
import handler from "../../../lib/api/handler";
import slugGenerator from "../../../lib/slugGenerator";
import authorize from "../../../lib/api/authorize";
import authorizeAuthor from "../../../lib/api/authorizeauthor";
import imageExtracter from "../../../lib/api/imageExtracter";
import axios from "axios";
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
  const { title, content, mainImage, tags, userId, token } = req.body;

  if (!title || !content || !mainImage || !userId)
    throw new Error("Veri eklenmemiş.");

  const response: any = await axios({
    params: {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
    },
    method: "POST",
    baseURL: "https://www.google.com",
    url: "/recaptcha/api/siteverify",
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (err) {
      const error = err.response.data.error;
      console.error(error);
      throw new Error(error);
    });
  console.log(response);
  if (!response.success) throw new Error("Çok fazla giriş yaptınız.");

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
      mainImage: mainImage,
      user: {
        connect: {
          id: userId,
        },
      },
    },
    select: { slug: true, id: true },
  });
  const url = mainImage;
  const arr = url.split("/");
  const file = arr[arr.length - 1];
  const image = await prisma.image.update({
    where: {
      url: file,
    },
    data: {
      post: {
        connect: {
          id: post.id,
        },
      },
    },
  });
  const urls = await imageExtracter(content);

  const images = urls.map((url) => {
    const image = prisma.image
      .update({
        where: {
          url: url,
        },
        data: {
          post: {
            connect: {
              id: post.id,
            },
          },
        },
      })
      .then((data) => {
        return data;
      });
  });
  await Promise.all(images).then(function (results) {});

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
  });
  await Promise.all(promises).then(function (results) {});
  res.status(200).json(post);
});

api.patch(async (req, res) => {
  const { title, content, mainImage, tags, userId, id, token } = req.body;

  if (!title || !content || !mainImage || !userId || !id)
    throw new Error("Veri eklenmemiş.");

  const response: any = await axios({
    params: {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
    },
    method: "POST",
    baseURL: "https://www.google.com",
    url: "/recaptcha/api/siteverify",
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (err) {
      const error = err.response.data.error;
      console.error(error);
      throw new Error(error);
    });
  console.log(response);
  if (!response.success) throw new Error("Çok fazla giriş yaptınız.");

  let tagArray = tags.toLowerCase().split(",");
  let slug = slugGenerator(title);
  const findSlug = await prisma.post.findUnique({
    where: { id: id },
    select: { slug: true },
  });
  if (!findSlug) throw new Error("Taslak bulunamadı.");

  const post = await prisma.post.update({
    where: { id: id },
    data: {
      title: title,
      content: content,
      slug: slug,
      mainImage: mainImage,
      user: {
        connect: {
          id: userId,
        },
      },
    },
    select: { slug: true, id: true },
  });

  const url = mainImage;
  const arr = url.split("/");
  const file = arr[arr.length - 1];
  const image = await prisma.image.update({
    where: {
      url: file,
    },
    data: {
      post: {
        connect: {
          id: post.id,
        },
      },
    },
  });
  const urls = await imageExtracter(content);

  const images = urls.map((url) => {
    const image = prisma.image
      .update({
        where: {
          url: url,
        },
        data: {
          post: {
            connect: {
              id: post.id,
            },
          },
        },
      })
      .then((data) => {
        return data;
      });
  });
  await Promise.all(images).then(function (results) {});

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
  const deletedImage = await prisma.image.delete({
    where: {
      url: file,
    },
  });

  const urls = await imageExtracter(post.content);

  const images = urls.map((url) => {
    unlink(`./public/images/${url}`).then(function (response) {
      const image = prisma.image
        .delete({
          where: {
            url: url,
          },
        })
        .then((data) => {
          return data;
        });
    });
  });
  await Promise.all(images)
    .then(function (results) {})
    .catch(function (err) {
      throw new Error(err);
    });

  res.status(200).json(post);
});

export default api;
