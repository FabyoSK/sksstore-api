import Sequelize, { Model } from 'sequelize';

class OrderProduct extends Model {
  static init(sequelize) {
    super.init(
      {
        product_id: Sequelize.STRING,
        supplier_id: Sequelize.STRING,
        quantity: Sequelize.STRING,
        price: Sequelize.STRING,
        name: Sequelize.STRING,
        image_url: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
  }
}

export default OrderProduct;
