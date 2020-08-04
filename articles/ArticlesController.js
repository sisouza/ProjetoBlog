const express = require("express")
//the "var" i will use to create my routers here
const router = express.Router()
const Category = require("../categories/Category");
const { default: slugify } = require("slugify");

router.get("/admin/articles", (req,res) => {
    res.send("Articles Router")
})

router.get("/admin/articles/new", (req,res) => {
    Category.findAll().then(categories =>{
        res.render("admin/articles/new",{categories: categories})
    })
})

router.post("/articles/save",(req,res) =>{
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId
    }).then(() => {
        res.redirect("/admin/articles")
    })
})

module.exports = router