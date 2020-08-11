function adminAuth(req,res,next){
//next is to req go on cause middleware stays between    
//will check if the user is logged in    
    if(req.session.user != undefined){
        next()
    }else{
//if the user is not logged in         
        res.redirect("/login")
    }
}

module.exports = adminAuth