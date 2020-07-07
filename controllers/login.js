const express = require('express');
const router = express.Router();


router.post('/submit', (req, res) => {

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
    else{
        response.render("dashboard", { 
            title: "Dashboard", 
            css: "form", 
            customer: `${email}` 
        });
    }
    
});


module.exports = router;