const express = require("express")
const router = express.Router()//setting routers
const Category = require("./Category");
const slugify = require("slugify");

//url
router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new")
})

//in "background" when we open new router
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


    router.get("/admin/categories",(req,res) => {
       Category.findAll().then(categories => { //var
        res.render("admin/categories/index",{categories:categories})
       })
    })

    //delete
    router.post("/categories/delete",(req,res) => {
        let id = req.body.id;
        if(id != undefined){
            //if id is not a number
            if(!isNaN(id)){

                Category.destroy({
                    where:{
                        id: id
                    }
                }).then(() =>{
                    res.redirect("/admin/categories")
                })

            }else{
                res.redirect("/admin/categories");
            }
        }else{   //if id is not NULL
            res.redirect("/admin/categories");
        }
    })

//edit
    router.get("/admin/categories/edit/:id",(req,res) =>{
        let id = req.params.id;

        if(isNaN(id)){
            res.redirect("/admin/categories")
        }

        Category.findByPk(id).then(category => {
            if(category != undefined){
                res.render("admin/categories/edit",{category: category})
            }else{
                res.redirect("/admin/categories")
            }  
        }).catch(erro => {
            res.redirect("/admin/categories")
        })
    })

 //update
    router.post("/categories/update",(req,res)=>{
        let id = req.body.id
        let title = req.body.title

        Category.update({title: title, slug: slugify(title)},{
            where:{
                id: id
            }
        }).then(() => {
            res.redirect("/admin/categories")
        })
    })   

//exporting router 
module.exports = router;