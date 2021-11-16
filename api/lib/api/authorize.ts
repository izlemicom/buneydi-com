import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export interface BuneydiRequest extends NextApiRequest {
  role: string | null;
  id: string | null;
}

export default async function authorize(
  req: BuneydiRequest,
  res: NextApiResponse,
  next
) {
  req.role = "USER";
  const session = await getSession({ req });
  if (!session) return next(new Error("Yetkiniz yok."));
  req.role = session.role.toString();
  req.id = session.id.toString();
  next();
}
