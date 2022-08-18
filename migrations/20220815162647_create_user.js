/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('users', (table) => {
      table.uuid('user_id').primary().defaultTo(knex.schema.raw('(UUID())'));
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.string('email', 255).notNullable();
      table.string('password');
      table.datetime('created_at');
      table.datetime('updated_at');
    })
    .createTable('accounts', (table) => {
      table.uuid('account_id').primary().defaultTo(knex.schema.raw('(UUID())'));
      table.string('account_number', 12).unique();
      table
        .uuid('user_id')
        .references('user_id')
        .inTable('users')
        .onDelete('cascade')
        .onUpdate('cascade');
      table.decimal('balance').defaultTo(0);
      table.datetime('created_at');
      table.datetime('updated_at');
    })
    .createTable('transactions', (table) => {
      table
        .uuid('transaction_id')
        .primary()
        .defaultTo(knex.schema.raw('(UUID())'));
      table.uuid('initiator').references('users.user_id');
      table.uuid('receipient').references('users.user_id');
      table.enu('transaction_type', ['withdrawal', 'funding', 'transfer']);
      table.enu('drcr', ['debit', 'credit']);
      table.decimal('amount');
      table.datetime('created_at');
      table.datetime('updated_at');
    });
  // ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('accounts')
    .dropTable('transactions')
    .dropTable('users');
};
