import * as express from 'express';
import UserController from '../controllers/User.controller';

const router = express.Router();

const userController = new UserController();

router.post('/', userController.login);

export default router;
