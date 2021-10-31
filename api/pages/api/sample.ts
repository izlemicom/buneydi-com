import authorize from "../../lib/api/authorize";
import authorizeAuthor from "../../lib/api/authorizeauthor";
import handler from "../../lib/api/handler";

handler.use(authorize);
handler.use(authorizeAuthor);

handler.get((req, res) => {
  res.status(200).json({
    url: process.env.BASE_IMAGE_URL,
  });
});

export default handler;
