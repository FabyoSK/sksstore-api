import Sequelize from 'sequelize';
import Order from '../app/models/Order';
import OrderProduct from '../app/models/OrderProduct';
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User, Order, OrderProduct];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig.url, databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
