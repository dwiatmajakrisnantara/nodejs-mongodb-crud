const express = require('express');
const homeRoute = require('./routes/home');
const app = express()





// MIDDLEWARE SETUP 
//VIEW ENGINE SETUP
app.set('view engine', 'ejs');
// STATIC FOLDER SETUP
app.use(express.static('public'));




// ROUTING 
app.use('/', homeRoute);




// RUNNING SERVER 
const PORT = process.env.PORT || 8000;

// STARTING THE SERVER
app.listen(PORT, ()=>{
    console.log('This app is rrunning on:', PORT);
})