import ILogin from '../interfaces/ILogin';
import User from '../database/models/User';

export default class UserService {
  constructor(private _userModel = User) {}

  login = async (body: ILogin): Promise<ILogin | void> => {
    const { email } = body;
    const userExists = await this._userModel.findOne({ where: { email } });
    if (!userExists) {
      return { ...body };
    }
    return body;
  };
}
