import * as express from 'express';
import AuthValidation from '../utils/AuthValidation';
import MatchesController from '../controllers/Matches.controller';

const router = express.Router();

const matchesController = new MatchesController();

router.get('/', matchesController.getAll);
router.post('/', AuthValidation, matchesController.insertMatch);
router.patch('/:id/finish', matchesController.finishedMatch);

export default router;
