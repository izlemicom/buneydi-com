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
    case "someTags":
      res.status(200).send(await someTags(take));
      break;
    case "allTags":
      res.status(200).send(await allTags());
      break;
  }
});

export default api;

async function allTags() {
  tags = await prisma.tag.findMany({
    select: {
      slug: true,
    },
  });
  return tags;
}

async function someTags(take) {
  if (!take) throw new Error("Veri eklenmemiş.");
  tagsCount = await prisma.tag.count({});
  const skip = Math.floor(Math.random() * tagsCount);
  tags = await prisma.tag.findMany({
    skip: skip,
    take: parseInt(take.toString()),
    select: {
      id: true,
      content: true,
      slug: true,
    },
  });
  return tags;
}

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
      orderBy: [
        {
          posts: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
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
      orderBy: [
        {
          posts: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });
  tagsCount = await prisma.tag.count();
  return { tags, tagsCount };
}
