import express from 'express';
import { TransactionController } from '../controllers/transaction';

const transactionRouter = express.Router()

transactionRouter.get('/:accountId', TransactionController.getTransactions);
transactionRouter.get('/:id', TransactionController.getTransactionById);
transactionRouter.post('/:account_number/withdraw', TransactionController.withdraw);;
transactionRouter.post('/:account_number/deposit', TransactionController.deposit);
transactionRouter.post('/:account_number/transfer', TransactionController.transfer);

export default transactionRouter