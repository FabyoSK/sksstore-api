import 'dotenv/config';

import Youch from 'youch';
import express from 'express';
import 'express-async-errors';

import cors from 'cors';
import routes from './routes';

import './database';
import redis from './config/redis';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
    this.redis();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }

  async redis() {
    await redis.connect();
  }
}

export default new App().server;
