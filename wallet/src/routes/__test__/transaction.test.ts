import request from 'supertest';
import app from '../../app';

describe('test for the Transaction router', () => {

    describe('test get /api/wallet/transactions', () => {
        it('should return 200 and the transactions', async () => {
            const cookie = await global.getAuthCookie();
            const response = await request(app)
                .get('/api/wallet/transactions')
                .set('Cookie', cookie)
                .expect(200);
            expect(response.body.message).toBe('Transactions fetched successfully');
            expect(response.body.object).toBeInstanceOf(Array);
        });

        it('should return 401 if user is not authenticated', async () => {
            await request(app)
                .get('/api/wallet/transactions')
                .expect(401);
        });
    })


    describe('test get /api/wallet/transactions/:id', () => {
        it('should return 200 and the transaction by id', async () => {
            const cookie = await global.getAuthCookie();
            const response = await request(app)
                .get('/api/wallet/transactions/1')
                .set('Cookie', cookie)
                .expect(200);
            expect(response.body.message).toBe('Transaction fetched successfully');
            expect(response.body.object).toHaveProperty('id');
        });

        it('should return 404 if transaction not found', async () => {
            const cookie = await global.getAuthCookie();
            await request(app)
                .get('/api/wallet/transactions/999')
                .set('Cookie', cookie)
                .expect(404);
        });

        it('should return 401 if user is not authenticated', async () => {
            await request(app)
                .get('/api/wallet/transactions/1')
                .expect(401);
        });
    }); 

    describe('test /api/wallet/transactions/withdraw', () => { 

        it('should return 201 and withdraw the amount', async () => {

        });

    });

    describe('test /api/wallet/transactions/deposit', () => {

    })

    describe('test /api/wallet/transactions/transfer', () => {

    });
})