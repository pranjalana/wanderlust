const express = require("express")
const router = express.Router() //require this single line
// const app = express()


//USERS - Index
router.get("/", (req, res) => {
    res.send("GET for users")
})

//USERS - Show
router.get("/:id", (req, res) => {
    res.send("GET for users id")
})

//USERS - POST
router.post("/", (req, res) => {
    res.send("POST for users")
})

//USERS - DELETE
router.delete("/:id", (req, res) => {
    res.send("DELETE for users id")
})


module.exports = router