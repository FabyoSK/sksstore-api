import { Router } from 'express';
import ProductController from './app/controllers/ProductController';
import SessionController from './app/controllers/SessionController';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Hello World' }));
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/products', ProductController.index);

export default routes;
