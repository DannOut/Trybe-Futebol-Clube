import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  constructor(private _matchesService = new MatchesService()) {}

  getAll = async (req: Request, res: Response) => {
    if (req.query.inProgress) {
      const progress = req.query.inProgress === 'true';
      const matchesFiltered = await this._matchesService.matchesInProgress(
        progress as unknown as boolean,
      );
      return res.status(200).json(matchesFiltered);
    }
    const allMatches = await this._matchesService.getAll();
    return res.status(200).json(allMatches);
  };
}
