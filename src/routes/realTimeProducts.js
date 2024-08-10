const express = require('express');
const router = express.Router();

const dataProducts = require("../data/products.json")

router.get('/products', (req, res) => {
    res.render('index', { products: dataProducts });
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products: dataProducts });
});


router.post('/products', (req, res) => {
    const newProduct = {
        id: dataProducts.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    dataProducts.push(newProduct);
    
    req.io.emit('productAdded', newProduct);

    res.status(201).send(newProduct);
});


router.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    dataProducts = dataProducts.filter(product => product.id !== productId);
    
    req.io.emit('removeProduct', productId);

    res.status(200).send({ message: 'Product deleted' });
});

module.exports = router;
