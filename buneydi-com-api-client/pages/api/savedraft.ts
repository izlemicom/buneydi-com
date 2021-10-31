import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { prisma } from "../../lib/db";
import slugGenerator from "../../lib/slugGenerator";

export default async function saveDraft(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({ err: "Gönderim metodu yanlış." });
  const session = getSession({ req });
  console.log(session);
  if (!session) return res.status(401).json({ err: "Yetkiniz yok." });
  const role = session.role;
  if (role !== "AUTHOR") return res.status(401).json({ err: "Yetkiniz yok." });
  const userId = session.id;
  const { title, content, mainImage, tags } = req.body;
  if (!title || !content || !mainImage || !userId)
    return res.status(400).json({ err: "Veri eklenmemiş." });
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
}
