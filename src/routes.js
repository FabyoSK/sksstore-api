import { Router } from 'express';
import SessionController from './app/controllers/SessionController';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Hello World' }));
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

export default routes;
