const express = require('express');
const router = express.Router();
const dataProducts = require("../data/products.json")


router.get('/', (req, res) => {
    res.render('index', {products: dataProducts });

})




module.exports = router;

