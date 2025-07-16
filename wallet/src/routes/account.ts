import express from 'express';
import AccountController from '../controllers/account';

const accountRouter = express.Router();
import { currentUser } from '../middlewares/current_user';


accountRouter.get('/:userId', currentUser, AccountController.getAccount);
accountRouter.post('/:userId', currentUser, AccountController.createAccount);



export default accountRouter;
