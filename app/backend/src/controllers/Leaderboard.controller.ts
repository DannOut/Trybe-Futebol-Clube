import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  getAllLeaderboard = async (req: Request, res: Response) => {
    if (req.route.path === '/home') {
      const homeLeaderboard = await LeaderboardService.getAllHomeLeaderboard();
      return res.status(200).json(homeLeaderboard);
    }
    if (req.route.path === '/away') {
      const awayLeaderboard = await LeaderboardService.getAllAwayLeaderboard();
      return res.status(200).json(awayLeaderboard);
    }
  };
}
