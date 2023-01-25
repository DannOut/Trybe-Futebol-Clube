import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Association,
} from 'sequelize';
import sequelize from '.';
import Teams from './Teams';

export default class Matches extends Model<
InferAttributes<Matches>,
InferCreationAttributes<Matches>
> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
  declare static associations: {
    [key: string]: Association<Model<Matches, Teams>>;
  };
}
Matches.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeamId: DataTypes.INTEGER.UNSIGNED,
    homeTeamGoals: DataTypes.INTEGER,
    awayTeamId: DataTypes.INTEGER.UNSIGNED,
    awayTeamGoals: DataTypes.INTEGER,
    inProgress: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: 'matches',
    tableName: 'matches',
    underscored: true,
    timestamps: false,
  },
);

Teams.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'teamHome' });

Teams.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayTeam' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'teamAway' });
