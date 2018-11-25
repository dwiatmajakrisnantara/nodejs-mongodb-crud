const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

//CHECK FOR CONNECTION
db.once('open', () => {
    console.log('Connected to mongoDB ');
})

//CHECK FOR ERROR
db.on('error', (err) => {
    console.log(err)
});


//INIT APP
const app = express();

//bring in models
let Article = require('./models/article');



//LOAD VIEW ENGINE
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

//SET PUBLIC FOLDER FOR STATIC ASSETS
app.use(express.static(path.join(__dirname, 'public')));



// HOME  ROUTE
app.get('/', (req, res) => {
    // PASSING ARTICLE FROM QUERY TO VIEW. DB TO VIEW TRANSFERING   
    Article.find({}, (err, articles) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Articles',
                articles: articles
            });
        }
    });
    /*  
    //THIS IS JUST STATIC DATA  
        let articles = [{
                id: 1,
                title: "article one",
                author: "Md Shayon",
                body: 'this is article one'
            },
            {
                id: 2,
                title: "article two",
                author: "Messi",
                body: 'this is article two'
            },
            {
                id: 3,
                title: "article three",
                author: "ronaldo",
                body: 'this is article three'
            },
        ]*/
});



//GET SINGLE ARTICLE

app.get('/article/:id',(req, res)=>{
    Article.findById(req.params.id,(err, article)=>{
        res.render('article', {
            article: article
        });
    });
});




//ADD ROUTE
app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: "Add"
    })
});
//IF REQUEST IS DIFFERENT WE CAN GO TO SAME URL
//ADD SUBMIT POST ROUTE
app.post('/articles/add',(req, res)=>{
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    article.save((err)=>{
        if(err){
            console.log(err);
            return;
        }else{
            res.redirect('/');
        }
    });
});




app.listen(3000, () => {
    console.log("server is started on localhost:3000...");

});