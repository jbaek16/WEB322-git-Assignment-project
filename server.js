const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

//load the environment variable file
require('dotenv').config({path:"./config/keys.env"}); //KEY PATH

const app = express();


//Handlebars middleware (This tells Express to set handlebars as the template engine)
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

//load controllers
const homeController = require("./controllers/home");

const regitController = require("./controllers/registration");
const loginController = require("./controllers/login");

//map each controller to the app object
app.use("/",homeController);
app.use("/registration",regitController);
app.use("/login",loginController);


///sets up server
const PORT = process.env.PORT;
app.listen(PORT,()=>{

    console.log(`Web Server is up and running`);    
});