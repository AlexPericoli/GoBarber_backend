import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import AppError from "../errors/AppError";
import authConfig from "../config/auth";

interface TokenPayload {
   iat: number;
   exp: number;
   sub: string;
}

export default function verifyAuth(
   request: Request,
   response: Response,
   next: NextFunction
): void {
   // Verifica validade do token
   const authHeader = request.headers.authorization;

   if (!authHeader) {
      throw new AppError("JWT Token não está presente", 401);
   }

   const [bearer, token] = authHeader.split(" ");

   try {
      const decoded = verify(token, authConfig.jwt.secret);

      const { sub } = decoded as TokenPayload;

      request.user = {
         id: sub,
      };

      return next();
   } catch (error) {
      throw new AppError("JWT Token inválido", 401);
   }
}
