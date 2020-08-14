const express = require('express');
const router = express.Router();
const mongoDB = require("../modules/userDBInfo.js");
const bcrypt = require('bcryptjs');

//Login Page route
router.get('/', (req, res) => {
    res.render("login", {
        title: "Log In",
        css: "login",
        user: req.session.user
    });
});

router.get('/error/userCred404', (req, res) => {
    const errCode = "ERROR - You must be logged in to access the Dashboard";
    res.render("login", {
        title: "Log In",
        css: "login",
        user: req.session.user,
        errCode: errCode
    }
    );
});

router.post("/", (req, res) => {    
    let formData = {
        email: req.body.email,
        password: req.body.password
    };

    mongoDB.validUserLogin(req.body)
    .then((user)=>{
        req.session.user = user;
        if (user.usertype)
        {
            res.redirect("clerkDashboard");
        }   
        else{
            res.redirect("custDashboard");
        }
    })
    .catch((data)=>{
        res.render("login", {
            title: "Log In",
            emailError: data.errors.email,
            passwordError: data.errors.password,
            formData: formData
        });
    });
});

/*router.post('/submit', (req, res) => {

    const pwVal = /^[A-Za-z]\w{6,12}$/;
    const emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const passwordErr = [];
    const passwordNull = [];
    const emailErr1 = [];
    const emailErr2 = [];


    if (req.body.password == "") {
        passwordErr.push("This field is required.")
    }

    if (req.body.password.match(pwVal)) {
        passwordNull.push("You must have letters and numbers.")
    }

    if (req.body.email == "") {
        emailErr1.push("This field is required.")
    }

    if (!req.body.email.match(emailVal)) {
        emailErr2.push("You must follow the email format.")
    }

    if (passwordErr.length > 0 || passwordNull.length > 0 || passwordErr.length > 0 || passwordNull.length > 0) {
        res.render("login", {
            title: "Log In",
            css: "login",

            errorMessages1: passwordErr,
            errorMessages2: passwordNull,
            errorMessages3: emailErr1,
            errorMessages4: emailErr2
        });
    }
    else {
         response.render("dashboard", { 
             title: "Dashboard", 
             css: "form", 
             customer: `${email}` 
         });
         //console.log(`Web Server is up and running`);   
        userInfo.find({ email: req.body.email }, function (err, temp) {
            if (temp.length == 0) {
                errors.push("-The credentials could not be found");
                res.render("login", {
                    title: "Log In",
                    css: "login",
                    message: errors
                })
            }
            else {
                bcrypt.compare(req.body.password, temp[0].password, function (err, match) {
                    if (err)
                        throw err
                    else if (!match) {
                        errors.push("Email or Password is invalid");
                        res.render("login", {
                            title: "Log In",
                            css: "login",
                            message: errors
                        })
                    }
                    else {
                        req.session.user = {
                            firstName: temp[0].firstName,
                            lastName: temp[0].lastName,
                            email: temp[0].email,
                            usertype: temp[0].usertype
                        }
                        res.redirect("/dashboard/custDashboard");
                    }
                });
            }
        });
    }
});*/

module.exports = router;