const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const list = require("../modules/productList.js");


router.get("/", (req, res) => {
    //dbMealList.getMeals(false).then((list) => {
        res.render("productList", {
            title: "Meals Package",
            data: list.getAllProducts()
        });
    })/*.catch((err) => {
        console.log("--Error--loading meals: " + err);
    });*/
//});

module.exports = router;

