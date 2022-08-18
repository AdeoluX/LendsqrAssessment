/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('accounts').del();
  await knex('accounts').insert([
    {
      user_id: '687ead9f-9cbd-4ba2-946c-dd4dfa15b993',
      account_id: 'f87ead9f-9cbd-4ba2-946c-dd4dfa15b996',
      account_number: '019283746564',
      balance: 20.0,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
