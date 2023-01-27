import * as express from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const router = express.Router();

const leaderBoardController = new LeaderboardController();

router.get('/home', leaderBoardController.getAllLeaderboard);
router.get('/away', leaderBoardController.getAllLeaderboard);
router.get('/', leaderBoardController.getAllLeaderboard);

export default router;
