const express = require('express');
const router = express.Router();
const Club = require('../models/Club');


router.get('/', (req, res)=>{
    res.render('home');
});

router.get('/add', (req, res)=>{
    res.render('home');
});


router.post('/add', (req, res)=>{

    const name = req.body.name;
    const players = req.body.players;
    const manager = req.body.manager;
    console.log(name, players, manager);
    // const club = new Club({

    // });
    
    // res.render('home');

    res.redirect('/');
})


module.exports = router;