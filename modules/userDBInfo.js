const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//const router = express.router();
let mongoConn = 'mongodb+srv://jinuk:jinukDB123@senecaweb.fnlb5.mongodb.net/web322_week8?retryWrites=true&w=majority';

let Schema = mongoose.Schema;
let UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    usertype: {
        type: Boolean,
        default: false
    },
});

let MealsSchema = new Schema({
    img: String,
    title:{
        type: String, 
        unique: true
    },
    category: String,
    price: String,
    nOfMeals: Number,
    desc: String,
    usertype: Boolean
});

let Users;
let MealList;

module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        let dbConn = mongoose.createConnection(mongoConn, { useNewUrlParser: true, useUnifiedTopology: true });

        dbConn.on("error", (err) => {
            reject(err);
        });

        dbConn.once('open', () => {
            MealList = dbConn.model("mealList", MealsSchema);
            Users = dbConn.model("users", UserSchema);
            resolve();
        });
    });
}

module.exports.getMeals = function (type) {
    return new Promise((resolve, reject) => {
        if (type)
            LookingForMeals = MealList.find({ top: true });
        else
            LookingForMeals = MealList.find();
        LookingForMeals
            .exec()
            .then((returnedMeals) => {
                if (returnedMeals.length != 0)
                    resolve(returnedMeals.map(item => item.toObject()));
                else
                    reject("No meals found");
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports.getMealsByTitle = function (newTitle) {
    return new Promise((resolve, reject) => {
        MealList.find({ title: newTitle })
            .exec()
            .then((returnedMeals) => {
                if (returnedMeals.length != 0)
                    resolve(returnedMeals.map(item => item.toObject()));
                else
                    reject("No meals found");
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports.validateMealAdd = function (data) {
    return new Promise((resolve, reject) => {
        data.errors = {};
        let flag = true;

        data.usertype = (data.usertype)? true: false;

        if (data.img == "") {
            data.errors.img = "This field is required";
            flag = false;
        }
        
        if (data.title == "") {
            data.errors.title = "This field is required";
            flag = false;
        }

        if (data.cat == "") {
            data.errors.category = "This field is required";
            flag = false;
        }

        if (data.price == "") {
            data.errors.price = "This field is required";
            flag = false;
        }
        else {
            let numValid = /[0-9]+[.]?[0-9]*/;
            if (!data.price.match(numValid)) {
                data.errors.price = "You must have Numbers";
                flag = false;
            }
        }

        if (data.desc == "") {
            data.errors.desc = "This field is required";
            flag = false;
        }

        if (!flag) {
            reject(data);
        } else {
            this.getMealsByTitle(data.title)
                .then((MealList) => {
                    data.errors.title = "This title is already used";
                    reject(data);
                })
                .catch(() => {
                    resolve(data);
                });
        }
    });
}

module.exports.addMeal = function (object) {
    return new Promise((resolve, reject) => {
        let newMeal= new MealList({
            img: object.img,
            title: object.title,
            category: object.category,
            price: object.price,
            nOfMeals: object.nOfMeals,
            desc: object.desc,
            usertype: object.usertype
        });

        newMeal.save((err) => {
            if (err) {
                console.log("--Error Message--: " + err);
                reject(err);
            }
            else {
                console.log("New Meal: " + object.title);
                resolve(newMeal);
            }
        });
    });
}


module.exports.validateMealEdit = function (object) {
    return new Promise((resolve, reject) => {
        object.errors = {};
        let flag = true;

        object.usertype = (object.usertype)? true: false;

        if (object.img == "") {
            object.errors.img = "This field is required";
            flag = false;
        }
        
        if (object.title == "") {
            object.errors.title = "This field is required";
            flag = false;
        }

        if (object.category == "") {
            object.errors.category = "This field is required";
            flag = false;
        }

        if (object.price == "") {
            object.errors.price = "This field is required";
            flag = false;
        }
        else {
            let numValid = /[0-9]+[.]?[0-9]*/;
            if (!data.price.match(numValid)) {
                object.errors.price = "You must have Numbers";
                flag = false;
            }
        }

        if (object.desc == "") {
            object.errors.desc = "This field is required";
            flag = false;
        }

        if (!flag) {
            reject(object);
        } else {
            resolve(object);
        }
    });
}

module.exports.editMeal = (object)=>{
    return new Promise((resolve, reject)=>{
        object.usertype = (object.usertype)? true: false;
        MealList.updateOne(
            {title : object.title}, 
            {$set: {  
                img: object.img,
                category: object.category,
                price: object.price,
                nOfMeals: object.nOfMeals,
                desc: object.desc,
                usertype: object.usertype
            }})
            .exec() 
            .then(()=>{
                console.log(`Meal ${object.title} is Success to update`);
                resolve();
            }).catch((err)=>{
                reject(err);
            });
    });
}


module.exports.addUser = function (object) {
    return new Promise((resolve, reject) => {
        let newUser = new Users({
            firstName: object.firstName,
            lastName: object.lastName,
            email: object.email,
            password: object.password,
            usertype: object.usertype,
        });

        bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(newUser.password, salt))
            .then(hash => {
                newUser.password = hash;
                newUser.save((err) => {
                    if (err) {
                        console.log("--Error Message--: " + err);
                        reject(err);
                    }
                    else {
                        console.log("New User: " + object.email +"!");
                        resolve(newUser);
                    }
                });
            })
            .catch(err => {
                console.log(err);
                reject("Error while hashing the password");
            });
            console.log("--Debug-- User Save Success");
    });
}

module.exports.getUsersByEmail = function (reqEmail) {
    return new Promise((resolve, reject) => {
        Users.find({ email: reqEmail })
            .exec()
            .then((returnedUsers) => {
                if (returnedUsers.length != 0)
                    resolve(returnedUsers.map(item => item.toObject()));
                else
                    reject("User Not Found");
            }).catch((err) => {
                console.log("Error finding users by email:" + err);
                reject(err);
            });
    });
}

module.exports.userConfirmRegistration = function (object) {
    return new Promise((resolve, reject) => {
        object.errors = {};
        let flag = true;

        
        if (object.firstName == "") {
            object.errors.firstName = "This field is required";
            flag = false;
        }
        else {
            let letters = /^[A-Za-z]+$/;
            if (!object.firstName.match(letters)) {
                object.errors.firstName = "You must have Letters";
                flag = false;
            }
        }

        if (object.lastName == "") {
            object.errors.lastName = "This field is required";
            flag = false;
        }

        if (object.email == "") {
            object.errors.email = "This field is required";
            flag = false;
        }

        if (object.password == "") {
            object.errors.password = "This field is required";
            flag = false;
        }
        else {
            let numLen = /^[a-z0-9]{6,12}$/i;
            if (!object.password.match(numLen)) {
                object.errors.password = "This field should only include letters or numbers and be from 6 to 12 characters long";
                flag = false;
            }
        }

        if (!flag) {
            reject(object);
        } else {
            this.getUsersByEmail(object.email)
                .then((user) => {
                    object.errors.email = "This email is already registered";
                    reject(object);
                })
                .catch(() => {
                    resolve(object);
                });
        }
    });
};

module.exports.validUserLogin = function(object) {
    return new Promise((resolve, reject) => {
        object.errors = {};

        if(object.email == "")
        object.errors.email = "This field is required";
        if(object.password == "")
        object.errors.password = "This field is required";

        if(object.email == "" || object.password == "") 
            reject(object);

        this.getUsersByEmail(object.email)
        .then((user) => {
            bcrypt
            .compare(object.password, user[0].password)
            .then((res) => {
                if (res) {
                    resolve(user[0]);
                } else {
                    object.errors.password = "Invalid password or email!";
                    reject(object);
                }
            })
            .catch((err) => {
                console.log("Comparing passwords error: " + err);
                reject(object);
            });
        })
        .catch((err) => {
            object.errors.email = "User with this email is Not Found";
            console.log("Getting user by email error: " + err);
            reject(object);
        });
    });
};
//module.exports = router;
