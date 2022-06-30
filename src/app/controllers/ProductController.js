import axios from 'axios';
import suppliers from '../../config/suppliers';

class ProductController {
  async index(req, res) {
    const productOneResponse = await axios.get(suppliers.supplier_1.api);
    const productTwoResponse = await axios.get(suppliers.supplier_2.api);

    const productOne = productOneResponse.data.map(product => ({
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

    // const productTwo = productTwoResponse.data.map(product => ({
    //   id: product.id,
    //   supplier_id: suppliers.supplier_2.id,
    //   name: product.nome,
    //   description: product.description,
    //   category: product.categoria,
    //   gallery: product.gallery,
    //   price: product.price,
    //   details: product.details,
    //   department: product.departamento,
    // }));

    const products = [...productOne];

    return res.json(products);
  }
}

export default new ProductController();
