import * as bycrypt from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import User from '../database/models/User';
import generateToken from '../utils/AuthService';
import ErrorHandler from '../utils/ErrorHandler';
import { incorrectEmailOrPassword } from '../utils/ErrorInfoFile';
import IUser from '../interfaces/IUser';

export default class UserService {
  constructor(private _userModel = User) {}

  login = async (body: ILogin): Promise<string | void> => {
    const { email, password } = body;
    const userExists = await this._userModel.findOne({ where: { email } });
    // checking if bycrypt is working
    if (userExists && bycrypt.compareSync(password, userExists.password)) {
      const newToken = generateToken(body);
      return newToken;
    }
    const { status, message } = incorrectEmailOrPassword;
    throw new ErrorHandler(status, message);
  };

  getRole = async (user: IUser): Promise<Partial<IUser> | void> => {
    const userExists = await this._userModel.findOne({
      where: { email: user.email },
    });
    if (userExists) return { role: userExists.role };
    const { status, message } = incorrectEmailOrPassword;
    throw new ErrorHandler(status, message);
  };
}
