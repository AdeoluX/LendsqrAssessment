const app = require('../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
// const { generateToken } = require('../src/utils/tokenManagement');
const httpStatus = require('http-status');
// const mongoose = require('mongoose');
//
describe('Tests', () => {
  let account_number;

  test('should return unauthorized trying fund account', async () => {
    let token = '0x0418094815340E67645E40991DF9a6A8A53f7f15-';
    const res = await request
      .post('/user/api/v1/fund/facfc946-9bdd-4873-9e83-4f3a3ee619bd')
      .set(`Authorization`, `Bearer ${token}`)
      .send({});
    expect(res.statusCode).toEqual(403);
  });

  test('create accounts successfully', async () => {
    let token = '0x0418094815340E67645E40991DF9a6A8A53f7f15';
    const res = await request
      .post('/user/api/v1/create-account/facfc946-9bdd-4873-9e83-4f3a3ee619bd')
      .set(`Authorization`, `Bearer ${token}`)
      .send({
        amount: 100,
      });
    account_number = res.body.data[0].account_number;
    expect(res.statusCode).toEqual(200);
  });

  test('should fund account successfully', async () => {
    let token = '0x0418094815340E67645E40991DF9a6A8A53f7f15';
    const res = await request
      .post('/user/api/v1/fund/facfc946-9bdd-4873-9e83-4f3a3ee619bd')
      .set(`Authorization`, `Bearer ${token}`)
      .send({
        amount: 100,
        account_number,
      });
    expect(res.statusCode).toEqual(200);
  });

  test('should withdraw from account', async () => {
    let token = '0x0418094815340E67645E40991DF9a6A8A53f7f15';
    const res = await request
      .post('/user/api/v1/withdraw/facfc946-9bdd-4873-9e83-4f3a3ee619bd')
      .set(`Authorization`, `Bearer ${token}`)
      .send({ amount: 40, account_number });
    expect(res.statusCode).toEqual(200);
  });

  test('should transfer to account', async () => {
    let token = '0x0418094815340E67645E40991DF9a6A8A53f7f15';
    const res = await request
      .post(`/user/api/v1/transfer/facfc946-9bdd-4873-9e83-4f3a3ee619bd`)
      .set(`Authorization`, `Bearer ${token}`)
      .send({
        account_number,
        receipient: '687ead9f-9cbd-4ba2-946c-dd4dfa15b993',
        account_to: '019283746564',
        amount: 10,
      });
    expect(res.statusCode).toEqual(200);
    //expect(res.body).toHaveProperty('post');
  });
});

// /get-my-prayers
