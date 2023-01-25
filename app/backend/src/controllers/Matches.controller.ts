import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  constructor(private _matchesService = new MatchesService()) {}

  getAll = async (_req: Request, res: Response) => {
    const allMatches = await this._matchesService.getAll();
    return res.status(200).json(allMatches);
  };
}
