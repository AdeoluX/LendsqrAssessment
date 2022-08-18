const httpStatus = require('http-status');
const { uuid } = require('uuidv4');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/tokenManagement');
const { abortIf } = require('../utils/responder');
const { userDTO } = require('../DTOs/user.dto');
const {
  getUsersById,
  updateUserById,
  getUsersByEmail,
  createUser,
  getAllUsers,
} = require('../dbservices/users.table');
const {
  createAccount,
  getAccountByAccountNumber,
  updateAccount,
  getAccountByAccountNumberAndUserId,
  getAllAccounts,
} = require('../dbservices/accounts.table');
const { createTransaction } = require('../dbservices/transactions.table');
const { db } = require('../../index');

const fundService = async (data) => {
  const { amount, user_id, account_number } = data;
  // check if user exists
  const user = await getUsersById(user_id);
  const account = await getAccountByAccountNumber(account_number);
  abortIf(!user[0], httpStatus.NOT_FOUND, 'User does not exist');
  abortIf(!account[0], httpStatus.NOT_FOUND, 'Account number does not exist');

  const current_balance = Number(account[0].balance);
  const balance = Number(amount) + current_balance;
  //log on transaction
  const transaction = {
    transaction_id: uuid(),
    amount,
    receipient: user_id,
    initiator: user_id,
    drcr: 'credit',
    transaction_type: 'funding',
    created_at: new Date(),
  };
  await createTransaction(transaction, null);
  const dbTransaction = await db.transaction(async (trx) => {
    const queries = Promise.all([
      updateAccount(
        account_number,
        {
          balance,
          updated_at: new Date(),
        },
        trx
      ),
    ])
      .then(trx.commit)
      .catch(trx.rollback);
    return queries;
  });
  const balance_ = await getAccountByAccountNumber(account_number);
  return balance_;
  // const log = await
  //update user balance
};

const createUserService = async (data) => {
  const { first_name, last_name, email } = data;
  const user = await getUsersByEmail(email);
  abortIf(user[0], httpStatus.BAD_REQUEST, 'Email already exists');
  const user_id = await uuid();
  const user_data = {
    user_id,
    first_name,
    last_name,
    email,
  };
  const create_user = await createUser(user_data);
  return [user_data];
};

const accountService = async (data) => {
  const { amount, user_id } = data;
  //create the account
  const account_number = await accountNumber();
  const account_id = uuid();
  const data_ = {
    user_id,
    account_id,
    account_number,
    balance: amount ?? 0,
    created_at: new Date(),
  };
  const account = await createAccount(data_);
  return [data_];
};

const transferFunds = async (data) => {
  const { account_number, receipient, account_to, amount, user_id } = data;
  //check account number
  const check_account_number = await getAccountByAccountNumber(account_number);
  const check_account_to = await getAccountByAccountNumber(account_to);
  abortIf(
    !check_account_number[0],
    httpStatus.BAD_REQUEST,
    'Account number does not exist'
  );
  abortIf(
    !check_account_to[0],
    httpStatus.BAD_REQUEST,
    'account_to does not exist'
  );
  abortIf(
    Number(check_account_number[0].balance) < amount,
    httpStatus.BAD_REQUEST,
    'Insufficient Funds'
  );

  const transaction = {
    transaction_id: uuid(),
    amount,
    receipient,
    initiator: user_id,
    drcr: 'debit',
    transaction_type: 'transfer',
    created_at: new Date(),
  };

  const senders_balance =
    Number(check_account_number[0].balance) - Number(amount);
  const receivers_balance =
    Number(check_account_to[0].balance) + Number(amount);
  //
  const dbTransaction = await db.transaction(async (trx) => {
    const queries = Promise.all([
      updateAccount(
        account_number,
        {
          balance: senders_balance,
          updated_at: new Date(),
        },
        trx
      ),
      updateAccount(
        account_to,
        {
          balance: receivers_balance,
          updated_at: new Date(),
        },
        trx
      ),
      createTransaction(transaction, trx),
    ])
      .then(trx.commit)
      .catch(trx.rollback);
    return queries;
  });
  const account_balance = await getAccountByAccountNumber(account_number);
  return account_balance;
};

const withdrawService = async (data) => {
  const { amount, user_id, account_number } = data;
  // check if user exists
  const user = await getUsersById(user_id);
  const account = await getAccountByAccountNumber(account_number);
  const user_account = await getAccountByAccountNumberAndUserId(
    account_number,
    user_id
  );
  abortIf(!user[0], httpStatus.NOT_FOUND, 'User does not exist');
  abortIf(!account[0], httpStatus.NOT_FOUND, 'Account number does not exist');
  abortIf(
    !user_account[0],
    httpStatus.NOT_FOUND,
    'Account number does not belong to User'
  );

  abortIf(
    Number(account[0].balance) < amount,
    httpStatus.BAD_REQUEST,
    'Insufficient Funds'
  );

  const current_balance = Number(account[0].balance);
  const balance = current_balance - Number(amount);
  //log on transaction
  const transaction = {
    transaction_id: uuid(),
    amount,
    receipient: user_id,
    initiator: user_id,
    drcr: 'debit',
    transaction_type: 'withdrawal',
    created_at: new Date(),
  };
  await createTransaction(transaction, null);
  const dbTransaction = await db.transaction(async (trx) => {
    const queries = Promise.all([
      updateAccount(
        account_number,
        {
          balance,
          updated_at: new Date(),
        },
        trx
      ),
    ])
      .then(trx.commit)
      .catch(trx.rollback);
    return queries;
  });

  const account_ = await getAccountByAccountNumber(account_number);
  return account_;
  // const log = await
  //update user balance
};

const getUserService = async () => {
  const users = await getAllUsers();
  return users;
};

const getAllAccountsService = async () => {
  const accounts = await getAllAccounts();
  return accounts;
};

const getOneUserService = async (user_id) => {
  const user = await getUsersById(user_id, true);
  abortIf(user.length < 1, httpStatus.NOT_FOUND, 'No User exists');
  return user;
};

function makeid(length) {
  var result = '';
  var characters = '0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const accountNumber = async () => {
  let number = '';
  let check;
  do {
    number = makeid(12);
    check = await getAccountByAccountNumber(number);
  } while (check.length > 0);
  return number;
};

module.exports = {
  fundService,
  accountService,
  transferFunds,
  withdrawService,
  createUserService,
  getUserService,
  getOneUserService,
  getAllAccountsService,
};
