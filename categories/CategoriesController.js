const express = require("express")
const router = express.Router()//setting routers


router.get("/categories", (req,res) => {
    res.send("Categories Router")
})

router.get("/admin/categories/new", (req, res) => {
    res.send("Admin Categories")
})

//exporting router 
module.exports = router;