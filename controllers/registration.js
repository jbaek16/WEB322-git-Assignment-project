const express = require('express');
const router = express.Router();

router.post('/submit', (req, res) => {

    const firstNameErr = [];
    const lastNameErr = [];
    const passwordErr = [];
    const passwordNull = [];
    const emailErr1 = [];
    const emailErr2 = [];

    const { firstName, lastName, email, password } = req.body;
    const pwVal = /^[A-Za-z]\w{6,12}$/;
    const emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    if (req.body.firstName == "") {
        firstNameErr.push("This field is required.")
    }

    if (req.body.lastName == "") {
        lastNameErr.push("This field is required.")
    }

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


    if (firstNameErr.length > 0 || lastNameErr.length > 0 || passwordErr.length > 0 || passwordNull.length > 0 || emailErr1.length > 0 || emailErr2 > 0) {
        res.render("registration", {
            title: "Registration",
            css: "registration",
            errorMessages1: firstNameErr,
            errorMessages2: lastNameErr,
            errorMessages3: passwordErr,
            errorMessages4: passwordNull,
            errorMessages5: emailErr1,
            errorMessages6: emailErr2
        });
    }
    /*if (error.length > 0) {
        res.render("registration", {
            title: "Registration",
            css: "registration",
            message: error
        });
    }*/
    else {

        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: `shinru879@gmail.com`,
            from: `${email}`,
            subject: 'Account registration',
            html:
                `Welcome to Live Fit Foods!!<br>
                Hi! ${firstName} ${lastName}, Your account has been successfully registered.<br><br>
                Your Full Name ${firstName} ${lastName} <br>
                Your Email Address ${email} <br>
                Your Password ${password} <br><br>
                Thank you.
                `,
        };

        //Asynchornous operation (who don't know how long this will take to execute)
        sgMail.send(msg)
            .then(() => {
                res.render("dashboard",
                    {
                        title: `Dashboard`,
                        css: `dashboard`,
                        customer: `${req.body.firstName} ${req.body.lastName} & ${email}`
                    });
            })
            .catch(err => {
                console.log(`Error ${err}`);
            });
    }

});

module.exports = router;