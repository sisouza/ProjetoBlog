const express = require("express")
//the "var" i will use to create my routers here
const router = express.Router()

router.get("/articles", (req,res) => {
    res.send("Articles Router")
})

router.get("/admin/articles/new", (req,res) => {
    res.render("/admin/articles/new")
})

module.exports = router