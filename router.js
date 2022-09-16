var express = require('express')
var router = express.Router()


//checking and pushing function

const users = []

const userAdd = ( (username, userpassword,useremail) => {
  users.push({'name' : username , 'password' : userpassword , 'email' : useremail})
  console.log(users)
})

const fetchUser = ( (useremail, userpassword) => { 
    let count = 0
    users.forEach(user => {
        if(user.email == useremail && user.password == userpassword){
            count = 1
        }
    });
    if (count == 1){
        return true
    }
    else{
        return false
    }
})

function checkUser(useremail)
{
    let count = 0
    users.forEach(user => {
        if(user.email == useremail ){
            count = 1
        }
    });
    if (count == 1){
        return true
    }
    else{
        return false
    }
}

  

//login user

router.post('/',(req,res)=>{
    if( fetchUser(req.body.email,req.body.password))
    {
        req.session.user = req.body.email    
        res.redirect('/route/dashboard')
    }else{
        res.end('invalid user')
    }
})


//Register

router.get('/register',(req,res)=>{
    
            res.render('register.ejs')
        
    })
router.post('/register',(req,res)=>{
    const name = req.body.name
    const password = req.body.password
    const email = req.body.email
    if(checkUser(email)){      
        res.render('base.ejs',{register : "you are already registered, please login"})        
    }
    else {
        userAdd(name,password,email)
        res.render('base.ejs',{register : "you are  registered, please login"})
    }
   
    res.redirect('/')
    
    
})


//route for homepage

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard.ejs',{user : req.session.user})
    }else{
        res.send('unauthorized user')
    }
})

//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function (err){
        if(err){
            console.log(err);
            res.send('error')
        }else{
            res.render('base.ejs',{title:"express",logout : "logout succesfully"})
        }
    })
})

module.exports = router