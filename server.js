const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const path = require("path")
const mongoose = require("mongoose"); // mongoose db
const mongoDB = require("./modules/userDBInfo.js");

const { request, response } = require("express");
const clientSession = require("client-sessions"); // client session
mongoose.set('useCreateIndex', true)
//load the environment variable file
require('dotenv').config({ path: "./config/keys.env" }); //KEY PATH

//Handlebars middleware (This tells Express to set handlebars as the template engine)
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Set client-sessions
app.use(clientSession({
  cookieName: "session", // this is the object name that will be added to 'req'
  secret: "SenecaWeb_A3", // this should be a long un-guessable string.
  duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
  activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
}));

/*const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      return cb(null, true);
    } else {
      return cb(new Error('Not an image! Please upload an image.', 400), false);
    }
  };  

const upload = multer({ storage: storage, fileFilter: imageFilter });

app.use(bp.urlencoded({ extended: true }));
app.set("views", "./views");//*/

/*//sets up server
let dbConn = mongoose.createConnection(process.env.MONGOOSE_CONN, { useNewUrlParser: true, useUnifiedTopology: true });
const sessionSet = new MongoDB({
    mongooseConnection: dbConn,
    collection: "sessions",
});

// catch db error
dbConn.on("error", (err) => {
    reject(err);
});
*/

//load controllers
const homeController = require("./controllers/home"); //home
const regitController = require("./controllers/registration"); //sign-up
const loginController = require("./controllers/login"); //login
const userController = require("./controllers/custDashboard"); // user dashboard
const clerkController = require("./controllers/clerkDashboard"); // clerk dashboard
const prodListController = require("./controllers/productList"); // product list 

//map each controller to the app object
app.use("/", homeController); //home
app.use("/regit", regitController); //sign up
app.use("/login", loginController); //login
app.use("/custDashboard", userController);// user dashboard
app.use("/clerkDashboard", clerkController);// clerk dashboard
app.use("/productList", prodListController);// product list 

mongoDB.initialize()     
.then(()=>{
    console.log("DB connect & read successfully");
    app.listen(process.env.PORT || 3000);
})  
.catch((data)=>{
  console.log(data);
});
