import * as express from 'express';
import TeamsController from '../controllers/Teams.controller';

const router = express.Router();

const teamsController = new TeamsController();

router.get('/', teamsController.getAll);

export default router;
