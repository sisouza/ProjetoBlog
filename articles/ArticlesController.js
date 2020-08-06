const express = require("express")
//the "var" i will use to create my routers here
const router = express.Router()
const Category = require("../categories/Category");
const Article = require("../articles/Article")
const { default: slugify } = require("slugify");

router.get("/admin/articles", (req,res) => {
    Article.findAll().then(articles =>{
        //including Category Model for join
        include: [{model: Category}]
        res.render("admin/articles/index",{articles: articles})
    })
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

router.post("/articles/delete",(req,res) =>{
    let id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where: {
                    id:id
                }
            }).then(() => {
                res.redirect("/admin/articles")
            })
        }else{
            res.redirect("/admin/articles")
        }
    }else{
            res.redirect("/admin/articles")
        }
})

module.exports = router