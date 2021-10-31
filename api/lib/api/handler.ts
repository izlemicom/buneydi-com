import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({ error: `Bir şeyler ters gitti! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Metoda '${req.method}' izin verilmiyor` });
  },
});
export default apiRoute;
