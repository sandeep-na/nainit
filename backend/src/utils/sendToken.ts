import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret-change-me";
const JWT_EXPIRES = process.env.JWT_EXPIRES ?? "7d";

export function signToken(userId: string): string {
  return jwt.sign({ id: userId }, JWT_SECRET as string, { expiresIn: JWT_EXPIRES } as jwt.SignOptions);
}
