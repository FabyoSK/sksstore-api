import Order from '../models/Order';
import OrderProduct from '../models/OrderProduct';

class OrderController {
  async store(req, res) {
    const { products } = req.body;

    await Order.sequelize.transaction(async t => {
      const order = await Order.create(
        {
          user_id: req.user_id,
        },
        { transaction: t }
      );

      await Promise.all(
        products.map(async product => {
          await OrderProduct.create(
            {
              product_id: product.id,
              order_id: order.id,
              supplier_id: product.supplier_id,
              quantity: product.quantity,
              price: product.price,
            },
            { transaction: t }
          );
        })
      );
    });

    return res.status(204).send();
  }
}

export default new OrderController();
