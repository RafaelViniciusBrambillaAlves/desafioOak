const Product  = require('../models/product');

// CRUD Controllers

//get all products
exports.getProducts = (req, res, next) => {
  Product.findAll()
      .then(products => {
          res.status(200).json({ products: products });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ message: 'Error fetching products' });
      });
}

//get product by id
exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findByPk(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found!' });
            }
            res.status(200).json({ product: product });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: 'Error fetching product' });
        });
}

//create product
exports.createProduct = (req, res, next) => {
  const { nome, descricao, valor, status } = req.body;
  Product.create({
    nome: nome,
    descricao: descricao,
    valor: valor,
    status: status
  })
    .then(result => {
      console.log('Created Product');
      res.status(201).json({
        message: 'Product created successfully!',
        product: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error creating product '})
    }); 
}

//update product
exports.updateProduct = (req, res, next) => {
  const productId = req.params.productId;
  const { nome, descricao, valor, status } = req.body;

  Product.findByPk(productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found!' });
      }
      product.nome = nome;
      product.descricao = descricao;
      product.valor = valor;
      product.status = status;
      return product.save();
    })
    .then(result => {
      res.status(200).json({message: 'Product  updated!', product: result});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'Error updating product' });
    });
}

//delete product
exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findByPk(productId)
    .then(product  => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found!' });
      }
      return Product.destroy({
        where: {
          id: productId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'Product  deleted!' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'Error deleting product' })
    });
}