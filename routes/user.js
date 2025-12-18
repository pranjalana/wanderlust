const express = require("express")
const router = express.Router() //our router object
const User = require("../models/user.js")
const wrapAsync = require("../utils/wrapAsync")
const passport = require("passport")
const { saveRedirectUrl } = require("../middleware.js")

const userController = require("../controllers/users.js")

//SIGNUP USER
router.route("/signup")
    .get(userController.renderSignupForm) //GET - signup user
    .post(wrapAsync(userController.signup)) //POST - signup user


//LOGIN USER
router.route("/login")
    .get(userController.renderLoginForm) //GET - login
    .post(saveRedirectUrl, //POST - login
    passport.authenticate("local", {
        failureRedirect: "/login", 
        failureFlash: true
    }), 
    userController.login)


//LOGOUT USER
router.get("/logout", userController.logout)

module.exports = router