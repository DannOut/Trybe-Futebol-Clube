import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import sequelize from '.';

export default class Teams extends Model<
InferAttributes<Teams>,
InferCreationAttributes<Teams>
> {
  declare id: CreationOptional<number>;
  declare teamName: string;

  // static associate(models) {
  //   // define association here
  // }
}
Teams.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'teams',
    tableName: 'teams',
    underscored: true,
    timestamps: false,
  },
);
