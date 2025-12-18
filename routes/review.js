const express = require("express")
const router = express.Router({mergeParams: true}) //our router object
const Listing = require("../models/listing.js")
const Review = require("../models/review.js")
const wrapAsync = require("../utils/wrapAsync.js")
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")

const reviewController = require("../controllers/reviews.js")

//REVIEWS 
//POST Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview))

//DELETE ROUTE for deleteing reviews from reviews collection as well as listings collection (objectId of reviews in listings)
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview))

module.exports = router