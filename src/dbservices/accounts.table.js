const { TABLES, db } = require('../../index');

const createAccount = (data) => {
  return db.insert(data).into(TABLES.ACCOUNTS);
};

const getAllAccounts = () => {
  return db(TABLES.ACCOUNTS).select('*');
};

const getAccountByAccountNumber = (account_number) => {
  return db(TABLES.ACCOUNTS).where({ account_number }).select();
};

const getAccountByAccountNumberAndUserId = (account_number, user_id) => {
  return db(TABLES.ACCOUNTS).where({ account_number, user_id }).select();
};

const updateAccount = async (account_number, changes, trx) => {
  if (trx) {
    return await db(TABLES.ACCOUNTS)
      .where({ account_number: account_number })
      .update(changes)
      .transacting(trx);
  } else {
    return await db(TABLES.ACCOUNTS)
      .where({ account_number: account_number })
      .update(changes);
  }
  // return await getAccountByAccountNumber(account_number);
};

module.exports = {
  createAccount,
  getAccountByAccountNumber,
  updateAccount,
  getAccountByAccountNumberAndUserId,
  getAllAccounts,
};
