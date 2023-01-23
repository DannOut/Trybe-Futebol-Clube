import * as express from 'express';
import UserValidation from '../middlewares/User.validation';
import UserController from '../controllers/User.controller';

const router = express.Router();

const userController = new UserController();

router.post('/', UserValidation, userController.login);

export default router;
