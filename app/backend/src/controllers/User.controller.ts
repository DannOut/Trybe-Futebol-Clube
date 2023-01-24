import { Request, Response } from 'express';
import UserService from '../services/User.service';

export default class UserController {
  constructor(private _userService = new UserService()) {}

  login = async (req: Request, res: Response) => {
    const token = await this._userService.login(req.body);
    return res.status(200).json({ token });
  };

  getRole = async (req: Request, res: Response) => {
    const role = await this._userService.getRole(req.body.user);
    return res.status(200).json(role);
  };
}
