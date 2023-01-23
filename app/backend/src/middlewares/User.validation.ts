import { NextFunction, Request, Response } from 'express';
import { blankFields } from '../utils/ErrorInfoFile';

export default async function UserValidation(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  const user = req.body;

  if (!user.email || !user.password) {
    return res.status(400).json({
      message: blankFields,
    });
  }
  next();
}
