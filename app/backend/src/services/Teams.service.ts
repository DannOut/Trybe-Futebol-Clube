// import ITeams from "src/interfaces/ITeams";

import ITeams from '../interfaces/ITeams';
import Teams from '../database/models/Teams';
import ErrorHandler from '../utils/ErrorHandler';

export default class TeamsService {
  // constructor(private _teamsModel = Teams) {}

  static async getAll(): Promise<ITeams[]> {
    const teams = await Teams.findAll();
    return teams;
  }

  static async getById(id: number): Promise<ITeams> {
    const team = await Teams.findByPk(id);
    if (team) return team;
    throw new ErrorHandler(401, 'Team not Found');
  }
}
