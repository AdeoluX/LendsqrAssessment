const catchAsync = require('../utils/catchAsync');
const {
  fundService,
  accountService,
  transferFunds,
  withdrawService,
  createUserService,
  getUserService,
  getOneUserService,
  getAllAccountsService,
} = require('../services');
const { successResponse, abortIf } = require('../utils/responder');
const httpStatus = require('http-status');

// class UserService {
const fundController = catchAsync(async (req, res, next) => {
  const data = {
    amount: req.body.amount,
    user_id: req.params.user_id,
    account_number: req.body.account_number,
  };
  const fund = await fundService(data);
  return successResponse(res, fund);
});

const createUserController = catchAsync(async (req, res, next) => {
  const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  };
  const user = await createUserService(data);
  return successResponse(res, user);
});

const getUsersController = catchAsync(async (req, res, next) => {
  const users = await getUserService();
  return successResponse(res, users);
});

const getOneUsersController = catchAsync(async (req, res, next) => {
  const user_id = req.params.user_id;
  const user = await getOneUserService(user_id);
  return successResponse(res, user);
});

const withdrawController = catchAsync(async (req, res, next) => {
  const data = {
    ...req.params,
    ...req.body,
  };
  const transfer = await withdrawService(data);
  return successResponse(res, transfer);
});

const allAccountsController = catchAsync(async (req, res, next) => {
  const accounts = await getAllAccountsService();
  return successResponse(res, accounts);
});

const transferController = catchAsync(async (req, res, next) => {
  const data = {
    ...req.params,
    ...req.body,
  };
  const transfer = await transferFunds(data);
  return successResponse(res, transfer);
});

const userAccountController = catchAsync(async (req, res, next) => {
  const email = req.params.email;
  console.log(email);
  const user = await getUserByEmail(email);
  return successResponse(res, user);
});

const createAccountController = catchAsync(async (req, res, next) => {
  const data = {
    amount: req.body.amount,
    user_id: req.params.user_id,
  };
  const account = await accountService(data);
  return successResponse(res, account);
});
// }

module.exports = {
  withdrawController,
  transferController,
  userAccountController,
  fundController,
  createAccountController,
  createUserController,
  getUsersController,
  getOneUsersController,
  allAccountsController,
};
