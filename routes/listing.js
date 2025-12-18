const express = require("express")
const router = express.Router() //our router object
const Listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js")
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js")
const listingController = require("../controllers/listings.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage }) //now multer will now by default save our files in cloudinary storage


//using Router.route - combine the same path and in that we will keep all diff reqs like get posts put delete etc - for /
router.route("/") //defined common route
    .get(wrapAsync(listingController.index)) //GET - Index route
    .post(isLoggedIn, validateListing, upload.single("listing[image]"), wrapAsync(listingController.createListing)) //POST - Create route


//NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm)


// for /:id
router.route("/:id")
    .get(wrapAsync(listingController.showListing)) //GET - Show route
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing)) //PUT - Update route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)) //DELETE - delete route


//EDIT Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm))


module.exports = router