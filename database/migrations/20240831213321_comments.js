/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('comments', (t) => {
    t.uuid('id').primary().defaultTo(knex.fn.uuid());
    t.string('text', 1000).notNullable();
    t.string('file_url', 1000).nullable();

    t.uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable();
    t.uuid('parent_comment_id')
      .references('id')
      .inTable('comments')
      .onDelete('CASCADE')
      .nullable()
      .defaultTo(null);

    t.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('comments');
};
