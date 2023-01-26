import * as express from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const router = express.Router();

const matchesController = new LeaderboardController();

router.get('/home', matchesController.getAllHome);

export default router;
