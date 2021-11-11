import authorize from "../../../lib/api/authorize";
import handler from "../../../lib/api/handler";
import { prisma } from "../../../lib/db";

const api = handler();

api.use(authorize);

api.post(async (req, res) => {
  console.log(req.body);
  const { userId, name, mahlas, bio, adress, city, country, postalCode } =
    req.body;
  if (
    !userId ||
    !name ||
    !mahlas ||
    !bio ||
    !adress ||
    !city ||
    !country ||
    !postalCode
  )
    throw new Error("Veri eklenmemiş.");

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("Kullanıcı bulunamadı.");

  const newUser = await prisma.user.update({
    data: {
      name: name,
      bio: bio,
      adress: adress,
      city: city,
      country: country,
      mahlas: mahlas,
      postalCode: postalCode,
      role: "AUTHOR",
    },
    where: { id: userId },
  });
  res.status(200).json(newUser);
});

export default api;
