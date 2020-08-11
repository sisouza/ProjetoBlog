const express = require("express")
//the "var" i will use to create my routers here
const router = express.Router()
const Category = require("../categories/Category");
const Article = require("../articles/Article")
const { default: slugify } = require("slugify");
const adminAuth = require("../middlewares/adminAuth")


router.get("/admin/articles", adminAuth, (req,res) => {
    Article.findAll({
        //including Category Model for join
        include: [{model: Category}]
    }).then(articles =>{
        res.render("admin/articles/index",{articles: articles})
    })
})

router.get("/admin/articles/new",adminAuth, (req,res) => {
    Category.findAll().then(categories =>{
        res.render("admin/articles/new",{categories: categories})
    })
})

router.post("/articles/save",adminAuth, (req,res) =>{
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

router.post("/articles/delete",adminAuth,(req,res) =>{
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
router.get("/admin/articles/edit/:id",adminAuth,(req,res)=>{
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
router.post("/articles/update",adminAuth, (req,res) => {
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
        offset = (parseInt(page) - 1)* 4;
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order:[
            ['id','DESC']
        ]
    }).then(articles => { 

        //verify if exists another page to be shown
        let next;
        if(offset + 4 >= articles.count){
            next = false;
        }else{
            next=true;
        }
        
        let result = {
            page: parseInt(page),
            next: next,
            articles: articles
        }

        Category.findAll().then(categories => {
            res.render("admin/articles/page",{result:result, categories:categories})
        })
    })
})


module.exports = router