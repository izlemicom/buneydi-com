import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/db";

export default async function setView(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({ err: "Gönderim metodu yanlış." });
  const { ip, postid, userid } = req.body;
  if (!ip) return res.status(400).json({ err: "Slug eklenmemiş." });

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
    return res.json({
      err: `${ip} IP adresinden görüntüleme artırım tespit edildi.`,
    });
  if (!postid) return res.status(400).json({ err: "Slug eklenmemiş." });

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
}
