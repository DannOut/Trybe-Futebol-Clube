import * as bycrypt from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import User from '../database/models/User';
import generateToken from '../utils/AuthService';
import IUserService from '../interfaces/IUserService';
import ErrorHandler from '../utils/ErrorHandler';
import { incorrectEmailOrPassword } from '../utils/ErrorInfoFile';

export default class UserService implements IUserService {
  constructor(private _userModel = User) {}

  login = async (body: ILogin): Promise<string | void> => {
    const { email, password } = body;
    const userExists = await this._userModel.findOne({ where: { email } });
    // checking if bycrypt is working
    if (userExists && bycrypt.compareSync(password, userExists.password)) {
      const newToken = generateToken(body);
      return newToken;
    }
    const { message } = incorrectEmailOrPassword;
    console.log('cheguei aqui');
    throw new ErrorHandler(401, message);
  };
}
