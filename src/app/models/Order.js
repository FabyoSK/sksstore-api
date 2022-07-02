import { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });

    this.hasMany(models.OrderProduct, {
      foreignKey: 'order_id',
      as: 'products',
    });
  }
}

export default Order;
