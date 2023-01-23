import { RequestHandler } from 'express';
import UserService from '../services/User.service';
// import IUserService from '../interfaces/IUserService';

export default class UserController {
  constructor(private _userService = new UserService()) {}
  // constructor(private _userService: IUserService) {}

  login: RequestHandler = async (req, res) => {
    const value = await this._userService.login(req.body);
    res.status(200).json(value);
  };
}
