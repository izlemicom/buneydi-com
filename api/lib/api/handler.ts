import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import cors from "cors";

export default function handler() {
  return nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
      console.error(error);
      res
        .status(501)
        .json({ error: `Bir şeyler ters gitti! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Metoda '${req.method}' izin verilmiyor` });
    },
  }).use(cors());
}
