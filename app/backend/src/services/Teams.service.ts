// import ITeams from "src/interfaces/ITeams";

import ITeams from '../interfaces/ITeams';
import Teams from '../database/models/Teams';
import ErrorHandler from '../utils/ErrorHandler';

export default class TeamsService {
  constructor(private _teamsModel = Teams) {}

  getAll = async (): Promise<ITeams[] | void> => {
    const teams = await this._teamsModel.findAll();
    return teams;
  };

  getById = async (id: number): Promise<ITeams | void> => {
    const team = await this._teamsModel.findByPk(id);
    if (team) return team;
    throw new ErrorHandler(401, 'Team not Found');
  };
}
