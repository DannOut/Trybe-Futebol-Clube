import { NextFunction, Request, Response } from 'express';
import * as jsonwebtoken from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const payload = jsonwebtoken.verify(token, secret as string);
    // Manobra evasiva do zambelli
    req.body.user = payload;
  } catch (error) {
    // console.log('ERROR', error);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
};
