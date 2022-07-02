import axios from 'axios';
import suppliers from '../../config/suppliers';

class ProductController {
  async index(req, res) {
    const productOneResponse = await axios.get(suppliers.supplier_1.api);
    const productTwoResponse = await axios.get(suppliers.supplier_2.api);

    const supplierProductOne = productOneResponse.data.splice(0, 5).map(product => ({
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

    const supplierProductTwo = productTwoResponse.data.splice(0, 5).map(product => ({
      id: product.id,
      supplier_id: suppliers.supplier_2.id,
      name: product.name,
      description: product.description,
      discount: product.discountValue,
      gallery: product.gallery,
      price: product.price,
      material: product.details.material,
      // hasDiscount: product.hasDiscount,
    }));

    const products = [...supplierProductOne,...supplierProductTwo];
    return res.json(products);
  },

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

    console.log('FSK => req.params:', req.params);
    console.log('FSK => api_url:', api_url);
    const response = await axios.get(api_url);
    const productResponse = response.data.find(product => product.id === id);

    const product = {
      id: productResponse.id,
      supplier_id: supplier_id,
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
}

export default new ProductController();
