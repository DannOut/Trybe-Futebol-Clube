import { Request, Response } from 'express';
import TeamsService from '../services/Teams.service';

export default class TeamsController {
  // constructor(private _teamsService = new TeamsService()) {}

  getAll = async (_req: Request, res: Response) => {
    const allTeams = await TeamsService.getAll();
    return res.status(200).json(allTeams);
  };

  getByID = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teamName = await TeamsService.getById(+id);
    return res.status(200).json(teamName);
  };
}
