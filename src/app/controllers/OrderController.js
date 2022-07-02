import Order from '../models/Order';
import OrderProduct from '../models/OrderProduct';

class OrderController {
  async store(req, res) {
    const { products } = req.body;

    await Order.sequelize.transaction(async t => {
      const order = await Order.create(
        {
          user_id: 1,
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
              name: product.name,
              image_url: product.image_url,
              price: product.price,
            },
            { transaction: t }
          );
        })
      );
    });

    return res.status(204).send();
  }

  async index(req, res) {
    const { user_id } = req;

    const orders = await Order.findAll({
      where: {
        user_id: 1,
      },
      include: { association: 'products' },
    });

    return res.status(200).json(orders);
  }
}

export default new OrderController();
