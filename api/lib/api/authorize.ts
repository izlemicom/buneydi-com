import { NextApiRequest, NextApiResponse } from "next";
import { Session, User } from "next-auth";
import { getSession } from "next-auth/client";
export interface BuneydiRequest extends NextApiRequest {
  role: string | null;
}
export interface BuneydiSession extends Session {
  role: string | null;
}
export default async function authorize(
  req: BuneydiRequest,
  res: NextApiResponse,
  next
) {
  req.role = "USER";
  const session = await getSession({ req });
  if (!session) return new Error("Yetkiniz yok.");
  req.role = session.role;
  next();
}
