const express = require ('express');
const router = express.Router();
const product = require("../modules/product"); 

router.get('/productList', (req, res) =>{
    res.render('productList',{ 
    title: 'Product Page',
   data: product.getAllProducts() 
    });
});
