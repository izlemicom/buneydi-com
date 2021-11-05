import handler from "../../../lib/api/handler";
import { prisma } from "../../../lib/db";

let posts = [];
let postCount = 0;
const api = handler();

api.get(async (req, res) => {
  console.log(req.query);
  let { isfirst, take, cursor, authorId } = req.query;
  res.status(200).send(await latestPosts(isfirst, take, cursor, authorId));
});

export default api;

async function latestPosts(isfirst, take, cursor, authorId) {
  if (!cursor || !take || !authorId) throw new Error("Veri eklenmemiş.");

  if (!isfirst)
    posts = await prisma.post.findMany({
      take: parseInt(take.toString()),
      skip: 1,
      cursor: { id: cursor.toString() },
      where: {
        state: "PUBLISHED",
        userId: authorId.toString(),
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
        userId: authorId.toString(),
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
      userId: authorId.toString(),
    },
  });
  return { posts, postCount };
}
