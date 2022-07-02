import { Router } from 'express';
import OrderController from './app/controllers/OrderController';
import ProductController from './app/controllers/ProductController';
import SessionController from './app/controllers/SessionController';

import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Hello World' }));
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/products', ProductController.index);
routes.get('/products/:supplier_id/:id', ProductController.indexOne);

routes.use(authMiddleware);

routes.post('/checkout', OrderController.store);
routes.get('/orders', OrderController.index);

export default routes;
