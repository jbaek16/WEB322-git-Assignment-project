const express = require('express');
const { request, response } = require('express');
const router = express.Router();
const mongoDB = require("../modules/userDBInfo.js");
const bcrypt = require('bcryptjs');
//var multer  = require('multer')
var path  = require('path')

//Regit Page route
router.get('/', (req, res) => {
    res.render("registration", {
        title: "Registration",
        css: "regit",
        user: req.session.user
    });
});

router.post('/', (req, res) => {
    let dataForm = {
        firstName: req.body.frstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };

    mongoDB.userConfirmRegistration(req.body).then((object) => {
        mongoDB.addUser(object).then((user) => {
            console.log("--Debug--Start Send Mail")
            const sgMail = require('@sendgrid/mail');     
            console.warn('SendGrid key =>', process.env.SENDGRID_API_KEY);
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            //sgMail.setApiKey("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");
            //npm install --save @sendgrid/mail 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
            const msg = {
                to: `shinru879@gmail.com`,
                from: dataForm.email,
                subject: 'Account registration',
                html:
                    `Welcome to Live Fit Foods!!<br>
                    Hi!, Your account has been successfully registered.<br><br>
                    We'll provide you with a good service.<br>
                    We hope you have a nice day. <br><br>
                    Thank you.
                    `,
            };
            sgMail.send(msg)
            console.log("here");
            //req.session.user = user;
            console.log("UserType: "+user.usertype);
            if (user.usertype = false) {
                res.redirect("clerkDashboard")
            } else {
                res.redirect("custDashboard");
            }

        }).catch((err) => {
            
            console.log("Error in registration: " + err);
        });
    }).catch((object) => {
        res.render("registration", {
            fnError: object.errors.firstName,
            lnError: object.errors.lastName,
            emailError: object.errors.email,
            pwError: object.errors.password,
            dataForm: dataForm
        });
    });
});
module.exports = router;
/*  router.post('/submit', (req, res) => {

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
            css: "regit",
            errorMessages1: firstNameErr,
            errorMessages2: lastNameErr,
            errorMessages3: passwordErr,
            errorMessages4: passwordNull,
            errorMessages5: emailErr1,
            errorMessages6: emailErr2
        });
    }
    if (error.length > 0) {
        res.render("registration", {
            title: "Registration",
            css: "registration",
            message: error
        });
    }
    else {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(Upassword, salt, function (err, hash) {
                const userLog = new User({
                    "firstName": UfirstName,
                    "lastName": UlastName,
                    "email": Uemail,
                    "password": hash,
                    "usertype": 2,
                })
                userLog.save((err) => {
                    if (err) {
                        errors.push("Email is already in use.");
                        res.render("registration", {
                            title: "Registration",
                            css: "regit",
                            message: errors
                        });
                        console.log(err);
                    } else {
                        req.session.user = {
                            firstName: userLog.firstName,
                            lastName: userLog.lastName,
                            email: userLog.email,
                            password: userLog.password,
                            usertype: userLog.usertype
                        }
                        const sgMail = require('@sendgrid/mail');
                        sgMail.setApiKey("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");
                        //npm install --save @sendgrid/mail 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
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
                                res.render("userDashboard",
                                    {
                                        title: `User Dashboard`,
                                        css: `dashboard`,
                                        customer: `${req.body.firstName} ${req.body.lastName} & ${email}`
                                    });
                                    
                            })
                            .catch(err => {
                                console.log(`Error ${err}`);
                            });
                        res.render("dashboard/custDashboard", {
                            title: `User Dashboard`,
                            css: `dashboard`,
                            user: req.session.user
                        });
                    }
                })
            });
        })
    }
});*/

