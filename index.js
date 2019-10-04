const express = require('express');
const app = express()





// MIDDLEWARE SETUP 
app.set('view engine', 'ejs');

app.use(express.static('public'));




// ROUTING 
app.get('/', (req, res)=>{
    res.render('home');
});




// RUNNING SERVER 
const PORT = process.env.PORT || 8000;


app.listen(PORT, ()=>{
    console.log('This app is rrunning on:', PORT);
})