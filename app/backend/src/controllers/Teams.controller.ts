import { Request, Response } from 'express';
import TeamsService from '../services/Teams.service';

export default class TeamsController {
  constructor(private _teamsService = new TeamsService()) {}

  getAll = async (_req: Request, res: Response) => {
    const allTeams = await this._teamsService.getAll();
    return res.status(200).json(allTeams);
  };
}
