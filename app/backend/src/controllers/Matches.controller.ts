import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  constructor(private _matchesService = new MatchesService()) {}

  getAll = async (req: Request, res: Response) => {
    if (req.query.inProgress) {
      const progress = req.query.inProgress === 'true';
      // prettier-ignore
      const matchesFiltered = await this._matchesService.matchesInProgress(
        progress as unknown as boolean,
      );
      console.log('matchesFiltered :>> ', matchesFiltered);
      return res.status(200).json(matchesFiltered);
    }
    const allMatches = await this._matchesService.getAll();
    return res.status(200).json(allMatches);
  };

  insertMatch = async (req: Request, res: Response) => {
    const matchToInsert = await this._matchesService.insertMatch(req.body);
    return res.status(201).json(matchToInsert);
  };

  finishedMatch = async (req: Request, res: Response) => {
    await this._matchesService.finishedMatch(+req.params.id);
    return res.status(200).json({ message: 'Finished' });
  };

  updateGoals = async (req: Request, res: Response) => {
    const { id } = req.params;
    const golsToUpdate = req.body;
    await this._matchesService.updateGoals(+id, golsToUpdate);
    return res
      .status(200)
      .json({ message: `Match ${id} was updated successfully!` });
  };
}
