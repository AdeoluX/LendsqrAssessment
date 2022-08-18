const { TABLES, db } = require('../../index');

const createTransaction = async (data, trx) => {
  if (!trx) {
    return await db.insert(data).into(TABLES.TRANSACTIONS);
  } else {
    return await db.insert(data).into(TABLES.TRANSACTIONS).transacting(trx);
  }
};

module.exports = {
  createTransaction,
};
