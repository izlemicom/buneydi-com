import handler from "../../../lib/api/handler";
import { prisma } from "../../../lib/db";

let tags = [];
let tagsCount = 0;
const api = handler();

api.get(async (req, res) => {
  let { isfirst, take, cursor, type } = req.query;
  switch (type) {
    case "latest":
      res.status(200).send(await latestTags(isfirst, take, cursor));
      break;
    case "mostMentioned":
      res.status(200).send(await mostMentionedTags(isfirst, take, cursor));
      break;
  }
});

export default api;

async function latestTags(isfirst, take, cursor) {
  if (!cursor || !take) throw new Error("Veri eklenmemiş.");

  if (!isfirst)
    tags = await prisma.tag.findMany({
      take: parseInt(take.toString()),
      skip: 1,
      cursor: { id: cursor.toString() },
      select: {
        id: true,
        slug: true,
        content: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  if (isfirst)
    tags = await prisma.tag.findMany({
      take: parseInt(take.toString()),

      select: {
        id: true,
        slug: true,
        content: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  tagsCount = await prisma.tag.count();
  return { tags, tagsCount };
}

async function mostMentionedTags(isfirst, take, cursor) {
  if (!cursor || !take) throw new Error("Veri eklenmemiş.");

  if (!isfirst)
    tags = await prisma.tag.findMany({
      take: parseInt(take.toString()),
      skip: 1,
      cursor: { id: cursor.toString() },
      select: {
        id: true,
        slug: true,
        content: true,
        createdAt: true,
      },
      orderBy: {
        posts: {
          _count: "desc",
        },
      },
    });
  if (isfirst)
    tags = await prisma.tag.findMany({
      take: parseInt(take.toString()),

      select: {
        id: true,
        slug: true,
        content: true,
        createdAt: true,
      },
      orderBy: {
        posts: {
          _count: "desc",
        },
      },
    });
  tagsCount = await prisma.tag.count();
  return { tags, tagsCount };
}
