import { NextFunction, Request, Response } from 'express';
import UserService from '../services/User.service';

export default class UserController {
  constructor(private _userService = new UserService()) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await this._userService.login(req.body);
      // console.log('token :>> ', token);
      res.status(200).json({ token });
    } catch (e) {
      next(e);
    }
  };
}
