/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('users').del();
  await knex('users').insert([
    {
      id: '1edc0a53-6df5-4d14-bc92-4d9c62751d22',
      username: 'certat1um',
      email: 'canvasworkst@gmail.com',
      password: 'LC0eo9xGHSg0ULM9Nsr+3g==',
    },
  ]);
};
