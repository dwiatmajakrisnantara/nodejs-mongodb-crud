const express = require('express');
const router = express.Router();
const Club = require('../models/Club');


router.get('/', (req, res) => {
    Club.find((err, docs)=>{
        if(err) throw err;
        console.log(docs);
        res.render('home',{teams:docs})        
    });
});



router.post('/add', (req, res, next) => {

    const {
        name,
        players,
        coach
    } = req.body;
    console.log(name, players, coach);
    const club = new Club({
        name,
        players,
        coach
    });
    club.save(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });

    // try {
    //     throw new Error('BROKEN')
    // } catch (err) {
    //     next(err)
    // }
});



module.exports = router;