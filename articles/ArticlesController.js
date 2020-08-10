const express = require("express")
//the "var" i will use to create my routers here
const router = express.Router()
const Category = require("../categories/Category");
const Article = require("../articles/Article")
const { default: slugify } = require("slugify");

router.get("/admin/articles", (req,res) => {
    Article.findAll({
        //including Category Model for join
        include: [{model: Category}]
    }).then(articles =>{
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
        categoryId: category
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

//editing articles
router.get("/admin/articles/edit/:id",(req,res)=>{
    let id = req.params.id
    Article.findByPk(id).then(article => {
        if(article != undefined){
            
            //to possibilite us to change article category
            Category.findAll().then(categories => {

                res.render("admin/articles/edit",{article:article, categories: categories})
            })

        }
    }).catch(err => {
        res.redirect("/")
    })
})

//updating edited articles
router.post("/articles/update", (req,res) => {
    let id = req.body.id;
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category

    Article.update({
    title: title,
    body: body,
    categoryId: category,
    slug: slugify(title)},{
    where:{
        id: id
         }
    }).then(() => {
        res.redirect("/admin/articles")
    }).catch(err => {
        res.redirect("/")
    })    
})

//control number of articles in each page

router.get("/articles/page/:num",(req,res) =>{
    let page = req.params.num;
//from the number of this element we will start showing the articles on each page
    let offset = 0;

    if(isNaN(page) || page ==1){
        offset = 0;
    }else{
//ex: page 2 then offset = 2 * 4 = 8 will start from 8 article in page 2
        offset = parseInt(page) * 4;
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset
    }).then(articles => { 

        //verify if exists another page to be shown
        let next;
        if(offset + 4 >= articles.count){
            next = false;
        }else{
            next=true;
        }
        
        let result = {
            next: next,
            articles: articles
        }

        res.json(result)
    })
})


module.exports = router