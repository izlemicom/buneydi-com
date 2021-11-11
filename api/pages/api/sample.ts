import authorize from "../../lib/api/authorize";
import authorizeAuthor from "../../lib/api/authorizeauthor";
import handler from "../../lib/api/handler";

const api = handler();

api.use(authorize);
api.use(authorizeAuthor);

api.get((req, res) => {
  res.status(200).json({
    url: process.env.BASE_IMAGE_URL,
  });
});

export default api;
