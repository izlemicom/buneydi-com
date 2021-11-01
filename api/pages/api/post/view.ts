import { prisma } from "../../../lib/db";

import handler from "../../../lib/api/handler";
const api = handler();

api.post(async (req, res) => {
  const { ip, postid, userid } = req.body;
  if (!ip) throw new Error("Veri eklenmemiş.");

  const views = await prisma.postViews.count({
    where: {
      ip: {
        equals: ip.toString(),
      },
      post: {
        id: {
          equals: postid.toString(),
        },
      },
    },
  });
  if (views > 10)
    throw new Error(`${ip} IP adresinden görüntüleme artırım tespit edildi.`);

  if (!postid) throw new Error("Veri eklenmemiş.");

  const view = await prisma.postViews.create({
    data: {
      ip: ip.toString(),
      post: {
        connect: {
          id: postid.toString(),
        },
      },
      user: {
        connect: {
          id: userid.toString(),
        },
      },
    },
  });
  res.status(200).json(view);
});

export default api;
