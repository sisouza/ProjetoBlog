const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const session = require("express-session")

//importing my categories and articles router
const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")
const usersController = require("./user/usersController")
//importing Models
const Article = require("./articles/Article")
const Category = require("./categories/Category")
const User = require("./user/User")


//set view engine ejs
app.set('view engine','ejs')

//static files just like imgs,css
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//database, connection
connection
    .authenticate()
    .then(() => {
        console.log("Successful Connection")
    }).catch((error) => {
        console.log(error)
    })

//set sessions
app.use(session({
                            //cookie time limit
    secret: "dontreadit", cookie: {maxAge: 30000}
}))

//using my routers
app.use("/",categoriesController)
app.use("/",articlesController)
app.use("/",usersController)

//principal router
app.get("/", (req, res) => {
    Article.findAll({
        order:[
            ['id','DESC']
        ],
        limit: 4
    }).then(articles =>{

        Category.findAll().then(categories => {
           
            //var that will be a list with our articles
    res.render("index",{articles: articles, categories:categories})
        })             
    })
})

//displaying each article page in index

app.get("/:slug",(req,res) => {
    let slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){

            Category.findAll().then(categories =>{
                 //passing var article to this view
            res.render("article",{article: article, categories: categories})
            })             
        }else{
            res.redirect("/")
        }
    }).catch( err => {
        res.redirect("/")
    })
})

//filtering articles by categories in menu by their slug
app.get("/category/:slug",(req,res) =>{
    let slug = req.params.slug;
    Category.findOne({
        where:{
            slug: slug
        },
        include: [{model: Article}]
    }).then( category => {
        if(category != undefined){

            Category.findAll().then(categories =>{
                res.render("index",{articles:category.articles, categories: categories})
            })

        }else{
            res.redirect("/")
        }
    }).catch( err =>{
        res.redirect("/")
    })
})



app.listen(8080, () => {
    console.log("Executing..")
})