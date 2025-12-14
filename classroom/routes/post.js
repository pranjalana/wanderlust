const express = require("express")
const router = express.Router() //require this single line


//POSTS - Index
router.get("/", (req, res) => {
    res.send("GET for posts")
})

//POSTS - Show
router.get("/:id", (req, res) => {
    res.send("GET for posts id")
})

//POSTS - POST
router.post("/", (req, res) => {
    res.send("POST for posts")
})

//POSTS - DELETE
router.delete("/:id", (req, res) => {
    res.send("DELETE for posts id")
})


module.exports = router