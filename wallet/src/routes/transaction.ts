import express from 'express';
import { TransactionController } from '../controllers/transaction';
import { currentUser } from '../middlewares/current_user';
import requireAuth from '../middlewares/require_auth'

const transactionRouter = express.Router()

transactionRouter.get('/', currentUser, requireAuth, TransactionController.getTransactions);
transactionRouter.get('/:id', currentUser, requireAuth, TransactionController.getTransactionById);
transactionRouter.post('/withdraw', currentUser, requireAuth, TransactionController.withdraw);;
transactionRouter.post('/deposit', currentUser, requireAuth, TransactionController.deposit);
transactionRouter.post('/transfer', currentUser, requireAuth, TransactionController.transfer);

export default transactionRouter