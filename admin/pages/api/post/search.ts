import { prisma } from "../../../lib/db";
import handler from "../../../lib/api/handler";
const api = handler();

api.get(async (req, res) => {
  const { text } = req.query;
  let posts;
  try {
    posts = await prisma.post.findMany({
      take: 20,
      where: {
        state: "PUBLISHED",
        content: {
          search: text.toString(),
        },
        OR: {
          title: {
            search: text.toString(),
          },
        },
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
  res.status(200).json(posts);
});

export default api;
