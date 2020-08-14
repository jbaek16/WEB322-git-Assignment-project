const express = require('express')
const router = express.Router();
//var fs = require('fs');
//var multer = require('multer');

//var Meal = require('../models/packDB.js');

function ensureLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect("/login/error/userCred404");
    } else {
        next();
    }
}

router.get("/", ensureLogin, (req, res) => {
    if (req.session.user.usertype == 1) {
        res.render("clerk/clerkDashboard", {
            title: "Clerk Dashboard",
            css: "dash", 
            user: req.session.user
        })
    } else if (req.session.user.usertype == 2) {
        res.render("dashboard/custDashboard",
            { title: "Dashboard", 
            css: "dash", 
            user: req.session.user 
        });
    }
});

//Add new meal route
router.get("/addMeal", (req, res) => {
    res.render("clerk/addMeal",
        {
            title: "Add Meal", 
            css: "newMeal",
            user: req.session.user
        });

    console.log("---DEBUG---GENERAL---REQ: " + req.session.name);
});


//Add new meal POST route
router.post('/submitNewMeal', (req, res) => {
    if (req.body == undefined) {
        res.redirect('/addMeal',
            {
                title: "Log In",
                css: "newMeal"
            });
    }
    else {
        const errors = [];

        if (req.body.name == "")
            errors.push("-Name is required");
        if (req.body.price == 0 || req.body.price == "")
            errors.push("-Price is required");
        if (req.body.category == "")
            errors.push("-Category is required");
        if (req.body.nOfMeals == "")
            errors.push("-Number of meals is required");
        if (req.body.synopsis == "")
            errors.push("-Description is required");
        if (req.body.img == "")
            errors.push("-Image is required");

        if (errors.length > 0) {
            res.render('clerk/addMeal', { 
                title: "Log In", 
                css: "newMeal", 
                errorList: errors });
        }

        else {

            const newMeal = new Meal({
                "name": req.body.name,
                "price": req.body.price,
                "category": req.body.category,
                "nOfMeals": req.body.nOfMeals,
                "synopsis": req.body.synopsis,
                "img": encImg
            })

            newMeal.save((err) => {
                if (err) {
                    console.log("ERROR --- ADDING MEAL -- " + err)
                    res.render('clerk/addMeal', {
                        title: "Log In",
                        css: "newMeal", errorList: errors
                    });
                }
                else {
                    const success = "The new meal has been added!"
                    res.render("clerk/addMeal", {
                        title: `Our meals`,
                        css: `newMeal`,
                        user: req.session.user, message: success
                    });
                }
            })
        }
    }
});


module.exports = router;