import { Response, Request, NextFunction } from "express";

import User from "../models/User";

import jwt from "jsonwebtoken";

const middleware = async (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers.authorization;

  if (!!token) throw {error: "NO_AUTHENTICATION", message: "Request needs authentication"};

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret');
    const exists = await User.exists({ _id: user });

    if (!exists) throw {error: "INVALID_TOKEN", message: "Not possible to validate token"};
  
    req.body.payload = user;
  } catch (error) {
    return res.json(error);  
  }
  
  return next();
}

export default middleware;