import * as express from 'express';
import UserValidation from '../middlewares/User.validation';
import UserController from '../controllers/User.controller';
import AuthValidation from '../utils/AuthValidation';

const router = express.Router();

const userController = new UserController();

router.post('/', UserValidation, userController.login);
router.get('/validate', AuthValidation, userController.getRole);

export default router;
