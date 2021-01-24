import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { securityConfig } from '../config/security.config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers['authorization'] as string;
  console.log(bearerHeader);
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    console.log(bearer);
    const bearerToken = bearer[1];
    try {
      const jwtPayload = <any>jwt.verify(bearerToken, securityConfig.secret);
      res.locals.jwtPayload = jwtPayload;
      next();
    } catch (error) {
      res.status(401).send();
      return;
    }

  } else {
    res.status(401).send();
    return;
  }
};
