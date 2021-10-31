import { prisma } from "../../../lib/db";
import handler from "../../../lib/api/handler";
import slugGenerator from "../../../lib/slugGenerator";
import authorize from "../../../lib/api/authorize";
import authorizeAuthor from "../../../lib/api/authorizeauthor";

handler.get(async (req, res) => {
  const { slug } = req.body;
  if (!slug) throw new Error("Veri eklenmemiş.");

  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
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

handler.use(authorize);
handler.use(authorizeAuthor);

handler.post(async (req, res) => {
  const { title, content, mainImage, tags, userId } = req.body;

  if (!title || !content || !mainImage || !userId)
    throw new Error("Veri eklenmemiş.");

  let tagArray = tags.lowerCase().split(",");
  let slug = slugGenerator(title);
  const findSlug = prisma.post.findUnique({
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
    select: { id: true },
  });

  const promises = tagArray.map((tag) => {
    const slug = slugGenerator(tag);
    const findSlug = prisma.tag.findUnique({
      where: { slug: slug },
    });
    if (findSlug) {
      const updated = prisma.tag.update({
        where: { slug: slug },
        data: {
          posts: {
            connect: {
              id: post.id,
            },
          },
        },
      });
      return updated;
    } else {
      const added = prisma.tag.create({
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
      });
      return added;
    }
  });
  Promise.all(promises).then(function (results) {
    console.log(results);
  });
  res.status(200).json(post);
});

export default handler;
