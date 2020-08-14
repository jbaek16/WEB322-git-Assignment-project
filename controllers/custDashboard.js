const express = require('express')
const router = express.Router();
const multer = require("multer");
const mongoDB = require("../modules/userDBInfo.js");
const path = require("path");


const storage = multer.diskStorage({
    destination: "./public/img/",
    filename: function(req, file, cb) 
    {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) 
    {
        return cb(null, true);
    } 
    else 
    {
        return cb(new Error('Not an image!', 400), false);
    }
};

const upload = multer({ 
    storage: storage, 
    fileFilter: imageFilter 
});

function ensureLoggedIn(req, res, next) 
{
    if (!req.session.user) 
      res.redirect("/login");
    else 
      next();
}

function ensureDataEntryClerk(req, res, next) 
{
    if (!req.session.user || !req.session.user.clerk) 
    {
        res.redirect("/login");
    } else {
        next();
    }
}

router.get("/", ensureLoggedIn, (req, res) => {
    res.render("custDashboard", {
        title: "dashboard",
        user: req.session.user
    });
});

router.get("/DataClerk", ensureDataEntryClerk, (req, res) => {
    res.render("dashboard", {
        title: "Data Entry Clerk",
        user: req.session.user
    });
});

router.get("/logout", function(req, res) {
    req.session.reset();
    res.redirect("/login");
});

/*router.get("/productList", function(req, res) {
    db.getTopMeals(false).then((data) => {
        res.render("productList", {
            title: "Clerk Dashboard Page",
            data: data,
            added: true
        });
    }).catch((err) => {
            res.render("productList", {
            title: "Clerk Dashboard Page",
            data: [],
            added: false
        });
    });
});

router.get("/addMeals", function(req, res) {
    res.render("addMeals", {
        title: "Add New Meal Package",
        succsessfullyAdded: false,
        user: req.session.user
    });
});

router.post("/addMeals", upload.single("picture"), (req, res) => {

    let formD = {
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        numberOfMeals: req.body.numberOfMeals,
        description: req.body.description,
        topMeal: req.body.topMeal
    };

    db.validateNewMealPackage(req.body).then((data) => {
        db.addMeal(data).then((meal) => {
            res.render("addMeals", {
                title: "Adding The New Package",
                ifMealAdded: true,
                errors: false,
                user: req.session.user
            });
        }).catch((err) => {
            console.log("Cannot add a Package: " + err);
        });
    }).catch((data) => {
        res.render("addMeals", {
            title: "Adding The New Package",
            errors: true,
            formD: formD,
            user: req.session.user
        });
    });
});*/

module.exports = router;