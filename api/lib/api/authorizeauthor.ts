import { NextApiResponse } from "next";
import { BuneydiRequest } from "./authorize";

export default async function authorizeAuthor(
  req: BuneydiRequest,
  res: NextApiResponse,
  next
) {
  if (req.role !== "AUTHOR") return new Error("Yetkiniz yok.");
  next();
}
