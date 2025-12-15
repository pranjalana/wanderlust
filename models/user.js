const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose").default

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
})

// Make sure passportLocalMongoose is a function
console.log("passportLocalMongoose type:", typeof passportLocalMongoose);


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema)