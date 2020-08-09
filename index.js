const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")


//importing my categories and articles router
const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")

//importing Models
const Article = require("./articles/Article")
const Category = require("./categories/Category")



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


//using my routers
app.use("/",categoriesController)
app.use("/",articlesController)

//principal router
app.get("/", (req, res) => {
    Article.findAll({
        order:[
            ['id','DESC']
        ]
    }).then(articles =>{
                     //var that will be a list with our articles
    res.render("index",{articles: articles})
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
                           //passing var article to this view
            res.render("article",{article: article})
        }else{
            res.redirect("/")
        }
    }).catch( err => {
        res.redirect("/")
    })
})


app.listen(8080, () => {
    console.log("Executing..")
})