import axios from 'axios';
import client from '../../config/redis';
import suppliers from '../../config/suppliers';

const getProducts = async () => {
  const productRedis = await client.get('products');

  if (!productRedis) {
    const productOneResponse = await axios.get(suppliers.supplier_1.api);
    const productTwoResponse = await axios.get(suppliers.supplier_2.api);

    const supplierProductOne = productOneResponse.data.map(product => ({
      id: product.id,
      supplier_id: suppliers.supplier_1.id,
      name: product.nome,
      description: product.descricao,
      category: product.categoria,
      image: product.imagem,
      price: product.preco,
      material: product.material,
      department: product.departamento,
    }));

    const supplierProductTwo = productTwoResponse.data.map(product => ({
      id: product.id,
      supplier_id: suppliers.supplier_2.id,
      name: product.name,
      description: product.description,
      discount: product.discountValue,
      gallery: product.gallery,
      price: product.price,
      material: product.details.material,
      has_discount: product.hasDiscount,
    }));

    const products = [...supplierProductOne, ...supplierProductTwo];

    await client.set('products', JSON.stringify(products));
    const oneHour = 60 * 60;
    client.expire('products', oneHour);

    return products;
  }
  return JSON.parse(productRedis);
};

class ProductController {
  async index(req, res) {
    const products = await getProducts();
    return res.json(products);
  }

  async indexOne(req, res) {
    const { supplier_id, id } = req.params;

    let api_url;

    switch (supplier_id) {
      case suppliers.supplier_1.id:
        api_url = suppliers.supplier_1.api;
        break;
      default:
        break;
    }

    const response = await axios.get(api_url);
    const productResponse = response.data.find(product => product.id === id);

    const product = {
      id: productResponse.id,
      supplier_id,
      name: productResponse.nome,
      description: productResponse.descricao,
      category: productResponse.categoria,
      image: productResponse.imagem,
      price: productResponse.preco,
      material: productResponse.material,
      department: productResponse.departamento,
    };

    return res.json(product);
  }

  async search(req, res) {
    const q = req.query;
    const products = await getProducts();

    const filteredProducts = products.filter(product => {
      if (product.name.includes(q.name)) {
        if (
          Number(q.max_price) !== 0 &&
          !(
            Number(product.price) >= Number(q.min_price) &&
            Number(product.price) <= Number(q.max_price)
          )
        ) {
          return null;
        }
        if (q.material !== null && q.material !== 'null') {
          return product.material.includes(q.material) ? product : null;
        }

        return product;
      }
    });

    return res.json(filteredProducts);
  }

  async indexCategories(req, res) {
    const products = await getProducts();

    const materials = products.map(product => product.material);
    const uniqueMaterials = Array.from(new Set(materials));

    return res.json({
      materials: uniqueMaterials,
    });
  }
}

export default new ProductController();
