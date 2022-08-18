const { TABLES, db } = require('../../index');

const createUser = async (data) => {
  return await db.insert(data).into(TABLES.USERS);
};

const getUsersById = async (user_id, include = false) => {
  // console.log(user_id);
  if (!include) {
    return await db.select('*').from(TABLES.USERS).where('user_id', user_id);
  } else {
    // console.log('include');
    return await db
      .select('*')
      .from(TABLES.USERS)
      .leftJoin(
        `${TABLES.ACCOUNTS} as accounts`,
        'accounts.user_id',
        'users.user_id'
      )
      .where('users.user_id', user_id);
  }
};

const getUsersByEmail = async (email, include = false) => {
  const users = db.select('*').from(TABLES.USERS).where('email', email);
  if (!include) {
    return await users;
  } else {
    return await users.join('accounts');
  }
};

const updateUserById = async (user_id, changes) => {
  return await db(TABLES.USERS).where({ user_id }).update(changes);
};

const getAllUsers = async (include = false) => {
  let users;
  if (include) {
    users = await db
      .select('*')
      .from(TABLES.USERS)
      .leftJoin(
        `${TABLES.ACCOUNTS} as accounts`,
        'accounts.user_id',
        'users.user_id'
      )
      .then((results) => {
        return results;
      });
  } else {
    users = await db
      .select('*')
      .from(TABLES.USERS)
      .then((results) => {
        return results;
      });
  }

  return users;
};

module.exports = {
  createUser,
  getAllUsers,
  getUsersById,
  updateUserById,
  getUsersByEmail,
};
