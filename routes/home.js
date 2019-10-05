const express = require('express');
const router = express.Router();
const Club = require('../models/Club');


router.get('/', (req, res)=>{
    res.render('home');
});

router.get('/add', (req, res)=>{
    res.render('home');
});


router.post('/add', (req, res, next)=>{

    const name = req.body.name;
    const players = req.body.players;
    const coach = req.body.coach;
    console.log(name, players, coach);
    const club = new Club({
        name,
        players,
        coach
    });
    club.save();
    
    // res.render('home');

    res.redirect('/');
})


module.exports = router;