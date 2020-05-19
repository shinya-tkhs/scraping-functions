import { Request, Response, NextFunction } from "express";
import * as auth from "basic-auth";
import * as functions from "firebase-functions";
import { IAdmin } from "../interfaces";
// import { config } from "firebase-functions";

const admin: IAdmin = {
  [functions.config().env.basic_auth.username]: {
    password: functions.config().env.basic_auth.password
  }
};

export const basicAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const user = auth(req);

  if (user && admin[user.name] && admin[user.name].password == user.pass) {
    next();
  } else {
    res.set("WWW-Authenticate", 'Basic realm="scraper"');
    return res.status(401).send();
  }
};
