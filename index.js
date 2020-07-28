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
    //rendering view ejs
    res.render("index")
})


app.listen(8080, () => {
    console.log("Executing..")
})