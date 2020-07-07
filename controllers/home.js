const express = require ('express');
const router = express.Router();


router.get('/', (req, res) =>{
    res.render('home',{ 
    title: 'Home Page',
    css: 'home'
    });
});


router.get('/login', (req, res) =>{
    res.render('login',{ 
    title: 'Login Page',
    css: 'login' 
    });
});

router.get('/registration', (req, res) =>{
    res.render('registration',{ 
    title: 'Registration Page',
    css: 'regit' 
    });
});

router.get('/product', (req, res) =>{
    res.render('product',{ 
    title: 'Product Page',
    css: 'product' 
    });
});


module.exports = router;