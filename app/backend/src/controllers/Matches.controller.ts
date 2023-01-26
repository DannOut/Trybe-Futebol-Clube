import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  getAll = async (req: Request, res: Response) => {
    if (req.query.inProgress) {
      const progress = req.query.inProgress === 'true';
      // prettier-ignore
      const matchesFiltered = await MatchesService.matchesInProgress(
        progress as unknown as boolean,
      );
      return res.status(200).json(matchesFiltered);
    }
    const allMatches = await MatchesService.getAll();
    return res.status(200).json(allMatches);
  };

  insertMatch = async (req: Request, res: Response) => {
    const matchToInsert = await MatchesService.insertMatch(req.body);
    return res.status(201).json(matchToInsert);
  };

  finishedMatch = async (req: Request, res: Response) => {
    await MatchesService.finishedMatch(+req.params.id);
    return res.status(200).json({ message: 'Finished' });
  };

  updateGoals = async (req: Request, res: Response) => {
    const { id } = req.params;
    const golsToUpdate = req.body;
    await MatchesService.updateGoals(+id, golsToUpdate);
    return res
      .status(200)
      .json({ message: `Match ${id} was updated successfully!` });
  };
}
