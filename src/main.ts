import dotenv from 'dotenv';
import 'reflect-metadata';
import Container from 'typedi';
import express, { Express } from 'express';
import { checkKnexConnection } from '../database/knex';
import { UserController } from './user/controllers/user';
import { createExpressServer, useContainer } from 'routing-controllers';
import { CommentController } from './comment/controllers/comment';
import { currentUserChecker } from './middlewares/currentUserChecker';
dotenv.config();

useContainer(Container);

const app: Express = createExpressServer({
  routePrefix: '/api',
  controllers: [UserController, CommentController],
  defaultErrorHandler: true,
  currentUserChecker,
});

const PORT = process.env.APP_PORT || 3000;

app.use(express.json());

app.listen(PORT, async () => {
  await checkKnexConnection();
  console.log(`Server listening on http://localhost:${PORT}`);
});
