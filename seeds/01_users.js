/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      user_id: 'facfc946-9bdd-4873-9e83-4f3a3ee619bd',
      first_name: 'User A',
      last_name: 'A_Surname',
      email: 'a@gmail.com',
      created_at: new Date(),
    },
    {
      user_id: '687ead9f-9cbd-4ba2-946c-dd4dfa15b993',
      first_name: 'User B',
      last_name: 'B_Surname',
      email: 'b@gmail.com',
      created_at: new Date(),
    },
  ]);
};
