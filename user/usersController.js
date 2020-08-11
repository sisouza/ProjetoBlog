const express = require("express")
const router = express.Router()
const User = require("./User")
const bcrypt = require('bcryptjs')
const e = require("express")

router.get("/admin/users",(req,res) =>{
    User.findAll().then(users =>{
        res.render("admin/users/index",{users:users})
    })
})

router.get("/admin/users/create", (req,res)=>{
    res.render("admin/users/create")
})

router.post("/users/create", (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    //check if email has been used or its free to new user
    User.findOne({where:{email:email}}).then( user => {
        if(user == undefined){

            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)
        
            User.create({
                email: email,
                password:hash
            }).then(() => {
                res.redirect("/")
            }).catch((err) =>{
                res.redirect("/")
            })

        }else{
            res.redirect("/admin/users/create")
        }
    })      
})

//login page
router.get("/login",(req,res) =>{
    res.render("admin/users/login")
})

//authenticate users router
router.post("/authenticate", (req,res) =>{
    let email = req.body.email
    let password = req.body.password

//lookng for user in db with the email on form
    User.findOne({
        where:{email: email}}).then(user =>{
    if(user != undefined){
            //compare password on form with password indb
        let correct = bcrypt.compareSync(password,user.password)
        
        if(correct){
            //create a session for authenticated users
            req.session.user = {
                id: user.id,
                email: user.email
            }
            res.json(req.session.user)
        }else{
            res.redirect("/login")
        }
    }else{
        res.redirect("/login")
    }     
    })
})

module.exports = router;