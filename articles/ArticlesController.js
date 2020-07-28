const express = require("express")
//the "var" i will use to create my routers here
const router = express.Router()

router.get("/articles", (req,res) => {
    res.send("Articles Router")
})

router.get("/admin/articles/new", (req,res) => {
    res.send("Articles admin router")
})

module.exports = router