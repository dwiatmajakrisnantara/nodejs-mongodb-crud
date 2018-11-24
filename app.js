const express = require('express');

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

//ADD ROUTE
app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: "Add"
    })
});


app.listen(3000, () => {
    console.log("server is started on localhost:3000...");

});