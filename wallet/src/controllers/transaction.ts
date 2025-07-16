import { Transaction, Transfer, transactionType, status } from "../models/transaction";
import { Request, Response } from "express";
import { Account } from "../models/account";
import { BadRequestError } from "../errors/badrequest_error";
import { NotFoundError } from "../errors/notfound_error";

export class TransactionController{
    static async getTransactions(req: Request, res: Response){
        const accountId = req.params.accountId;
        const account = await Account.findById(accountId);
        if(!account) throw new NotFoundError();
        const transactions = Transaction.findByAccount(accountId);
        res.status(200).json({ message: 'transactions retrieved', object: transactions });
    }

    static async getTransactionById(req: Request, res: Response) {
        const id = req.params.id;
        const transaction = Transaction.findById(id);

        if (!transaction) throw new NotFoundError();

        res.status(200).json({ message: 'transaction retrieved', object: transaction })

    }

    static async withdraw(req: Request, res: Response) {
        const account_number = req.params.account_number;
        const { amount } = req.body;
        const account = await Account.findByAccountNumber(account_number);
        if (!account) throw new NotFoundError();
        const transaction = Transaction.build({
            type: transactionType.withdrawal,
            status: status.pending,
            amount,
            account: account_number
        });
        await transaction.save();
        await account.withdraw(amount);
        transaction.status = status.completed;
        await transaction.update();
        res.status(201).send({ message: 'withdrawal successful', object: transaction });

    }

    static async deposit(req: Request, res: Response) {
        const account_number = req.params.account_number;
        const { amount } = req.body;
        const account = await Account.findByAccountNumber(account_number);
        if (!account) throw new NotFoundError();
        const transaction = Transaction.build({
            type: transactionType.deposit,
            status: status.pending,
            amount,
            account: account_number
        });
        await transaction.save();
        await account.deposit(amount);
        transaction.status = status.completed;
        await transaction.update();
        res.status(201).send({ message: 'deposit successful', object: transaction });
    }

    static async transfer(req: Request, res: Response) {
        const account_number = req.params.account_number;
        const { amount, receiver } = req.body;
        const account = await Account.findByAccountNumber(account_number);
        if (!account) throw new NotFoundError();
        const receiverAccount = await Account.findByAccountNumber(receiver);
        if (!receiverAccount) throw new NotFoundError();
        
        const transaction = Transfer.build({
            type: transactionType.transfer,
            status: status.pending,
            amount,
            account: account_number,
            receiver
        });
        await transaction.save();
        await account.withdraw(amount);
        await receiverAccount.deposit(amount);
        
        transaction.status = status.completed;
        await transaction.update();
        res.status(201).send({ message: 'transfer successful', object: transaction });

    }


    
}