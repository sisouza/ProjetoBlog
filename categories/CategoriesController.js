const express = require("express")
const router = express.Router()//setting routers
const Category = require("./Category");
const slugify = require("slugify");

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new")
})

router.post("/categories/save", (req, res) =>{

//will store the data from our form title var
    let title = req.body.title
    if(title != undefined){

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() =>{
            res.redirect("/");
        })

    }else{
        res.redirect("/admin/categories/new")
    }
})

//exporting router 
module.exports = router;