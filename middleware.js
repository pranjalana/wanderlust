const Listing = require("./models/listing")
const Review = require("./models/review")
const ExpressError = require("./utils/ExpressError.js")
const {listingSchema, reviewSchema} = require("./schema.js")


module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl
        req.flash("error", "Please login to create a new Listing!")
        return res.redirect("/login")
    }
    next()
}


module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
}


//checks if currentuser is the owner of the listing or not
module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params
    let listing = await Listing.findById(id)
    if(!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this Listing!")
        return res.redirect(`/listings/${id}`)
    }
    next()
}


//validating server side validation for models - listings
module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body)
    if(error) {
        let errMsg= error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, errMsg)
    } else {
        next()
    }
}


//validating server side validation for models - reviews
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body)
    if(error) {
        let errMsg= error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, errMsg)
    } else {
        next()
    }
}


//checks if currentuser is the author of the review or not
module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId} = req.params
    let review = await Review.findById(reviewId)
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review!")
        return res.redirect(`/listings/${id}`)
    }
    next()
}