import { Request } from "express";
import * as jwt from 'jsonwebtoken';
import { secret } from "../config";
import { userResponseFactory, UserResponse } from "../models/responses/auth/user.response.model";

export function decodeToken(req: Request): UserResponse {

  const tokenHeader = req.headers.authorization.slice(6);
  const token = jwt.verify(tokenHeader, secret);

  return userResponseFactory(token.user);

}
