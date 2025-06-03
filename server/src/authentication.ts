import { Request } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "BearerAuth") {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return Promise.reject({ status: 401, message: { error: "No token provided" } });
    }
    try {
      const user = jwt.verify(token, JWT_SECRET);
      // Optionally check scopes here
      return user;
    } catch (err) {
      return Promise.reject({ status: 403, message: { error: "Invalid token" } });
    }
  }
  return Promise.reject({ status: 401, message: { error: "Unknown security name" } });
}