// import ITeams from "src/interfaces/ITeams";

import ITeams from '../interfaces/ITeams';
import Teams from '../database/models/Teams';

export default class TeamsService {
  constructor(private _teamsModel = Teams) {}

  getAll = async (): Promise<ITeams[] | void> => {
    const teams = await this._teamsModel.findAll();
    return teams;
  };
}
