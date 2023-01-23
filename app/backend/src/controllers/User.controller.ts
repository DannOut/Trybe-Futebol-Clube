import { NextFunction, Request, Response } from 'express';
import UserService from '../services/User.service';
// import IUserService from '../interfaces/IUserService';

export default class UserController {
  constructor(private _userService = new UserService()) {}
  // constructor(private _userService: IUserService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await this._userService.login(req.body);
      console.log('token :>> ', token);
      res.status(200).json({ token });
    } catch (e) {
      next(e);
    }
  };
}
