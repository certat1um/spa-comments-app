/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function up(knex) {
  return knex.schema.createTable('users', (t) => {
    t.uuid('id').primary().defaultTo(knex.fn.uuid());
    t.string('username', 255).notNullable();
    t.string('email', 255).notNullable().unique();
    t.string('password', 255).notNullable();

    t.timestamps(true, true);
  });
};

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function down(knex) {
  return knex.schema.dropTable('users');
};
