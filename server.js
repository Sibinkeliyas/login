
const express = require ('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const session =require('express-session')
const {v4:uuidv4} = require('uuid')
const router = require('./router')



const PORT = process.env.PORT||3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(function(req, res, next) {
    if (!req.user) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
    }
    next();
});

app.set('view engin','ejs')
// load static asset
app.set('/static',express.static(path.join(__dirname,'public')))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true

}))

//home page

app.get('/',(req,res)=>{
    res.render('base.ejs',)
})
app.listen(PORT)

//router

app.use('/route',router)


app.use((err,data)=>{
    if(err) throw err
    else{

    }
})




