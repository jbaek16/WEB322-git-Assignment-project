const express = require ('express');
const { request } = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('home',{ 
    title: 'Home Page',
    css: 'home',
    });

    console.log("---ACCESS---Home---REQ: " + req.session.name);
});

module.exports = router;