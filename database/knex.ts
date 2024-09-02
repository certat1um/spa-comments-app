import knexInstance, { Knex } from 'knex';
import { Model as ObjectionModel } from 'objection';
// @ts-expect-error
import knexConfiguration from '../knexfile';

const knex = knexInstance(knexConfiguration as Knex.Config);

ObjectionModel.knex(knex);

const checkKnexConnection = async () => {
  knex
    .raw('SELECT 1')
    .then(() => console.log('Database is connected'))
    .catch((err) => console.log('Failed connection to database: ' + err));
};

export { knex, ObjectionModel, checkKnexConnection };
