import { Request } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export enum SecurityTypes {
  BearerAuth = "BearerAuth",
}

export async function expressAuthentication(
  request: Request,
  securityName: SecurityTypes,
): Promise<any> {
  switch (securityName) {
    case SecurityTypes.BearerAuth: {
      const authHeader = request.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        return Promise.reject({ status: 401, message: "No token provided" });
      }
      try {
        return jwt.verify(token, JWT_SECRET);
      } catch (err) {
        return Promise.reject({ status: 403, message: "Invalid token" });
      }
    }
  }
}