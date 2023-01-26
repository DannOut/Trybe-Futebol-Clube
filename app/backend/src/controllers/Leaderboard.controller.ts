import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  getAllHome = async (_req: Request, res: Response) => {
    const homeLeaderboard = await LeaderboardService.getAllHomeLeaderboard();
    return res.status(200).json(homeLeaderboard);
  };
}
