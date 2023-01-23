import { Model, CreationOptional, DataTypes } from 'sequelize';
import IUser, { role } from '../../interfaces/IUser';
import sequelize from '.';

export default class User extends Model implements IUser {
  declare id: CreationOptional<number>;
  declare username: string;
  declare role: role;
  declare email: string;
  declare password: string;
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: 'users',
    tableName: 'users',
    sequelize,
    underscored: true,
    timestamps: false,
  },
);
