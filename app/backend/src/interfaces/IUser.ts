type role = 'admin' | 'user';

export default interface IUser {
  id: number;
  username: string;
  email: string;
  role: role;
  password: string;
}

export { role };
