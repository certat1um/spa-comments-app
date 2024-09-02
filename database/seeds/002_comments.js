/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('comments').del();
  await knex('comments').insert([
    {
      id: '1edc0a53-6df5-4d14-bc92-4d9c62751d01',
      text: '1st Parent comment text',
      user_id: '1edc0a53-6df5-4d14-bc92-4d9c62751d22',
      parent_comment_id: null,
    },
    {
      id: '1edc0a53-6df5-4d14-bc92-4d9c62751d10',
      text: '1st Child comment text',
      user_id: '1edc0a53-6df5-4d14-bc92-4d9c62751d22',
      parent_comment_id: '1edc0a53-6df5-4d14-bc92-4d9c62751d01',
    },
    {
      id: '1edc0a53-6df5-4d14-bc92-4d9c62751d11',
      text: '2nd Child comment text',
      user_id: '1edc0a53-6df5-4d14-bc92-4d9c62751d22',
      parent_comment_id: '1edc0a53-6df5-4d14-bc92-4d9c62751d01',
    },
    {
      id: '1edc0a53-6df5-4d14-bc92-4d9c62751d02',
      text: '2nd Parent comment text',
      user_id: '1edc0a53-6df5-4d14-bc92-4d9c62751d22',
      parent_comment_id: null,
    },
    {
      id: '1edc0a53-6df5-4d14-bc92-4d9c62751d20',
      text: '1st Child comment text',
      user_id: '1edc0a53-6df5-4d14-bc92-4d9c62751d22',
      parent_comment_id: '1edc0a53-6df5-4d14-bc92-4d9c62751d02',
    },
  ]);
};
