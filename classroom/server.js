const express = require("express")
const app = express()
const users = require("./routes/user.js") //1st require that file then use it 
const posts = require("./routes/post.js") //1st require that file then use it 
// const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("connect-flash")

const sessionOptions = {secret: "mysupersecretstring", resave: false, saveUninitialized: true}

app.use(session(sessionOptions))
app.use(flash())

app.get("/register", (req, res) => {
    let {name = "anonymous"} = req.query
    req.session.name = name
    req.flash("success", "user registered successfully")
    res.redirect("/hello")
})


// app.get("/reqcount", (req, res) => {
//     if(req.session.count) {
//         req.session.count++
//     } else {
//         req.session.count = 1
//     }
//     res.send(`you sent request ${req.session.count} times`)
// })


//express sessions is basically our npm package

app.listen(3000, () => {
    console.log("server is listening to port 3000")
})















































// app.use(cookieParser("secretcode"))

// app.get("/getsignedcookie", (req, res) => {
//     res.cookie("made-in", "India", {signed: true})
//     res.send("signed cookie sent")
// })

// app.get("/verify", (req, res) => {
//     console.log(req.signedCookies)
//     res.send("verified")
// })


// app.get("/getcookies", (req, res) => {
//     res.cookie("greet", "hello")
//     res.send("cookies sent")
// })


// app.get("/greet", (req, res) => {
//     let {name = "nameless"} = req.cookies    
//     res.send(`Hi, ${name}`)
// })

// app.get("/", (req, res) => {
//     console.dir(req.cookies)
//     res.send("Hi, I am root!")
// })


// app.use("/users", users) //2nd use it, it will match all/ with users and then take it from user.js, common path for all user routes.
// app.use("/posts", posts) //2nd use it, it will match all/ with users and then take it from user.js, common path for all user routes.
