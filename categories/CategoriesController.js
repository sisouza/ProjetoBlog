const express = require("express")
const router = express.Router()//setting routers

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new")
})

//exporting router 
module.exports = router;