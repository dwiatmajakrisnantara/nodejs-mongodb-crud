const express = require('express');
const router = express.Router();
const Club = require('../models/Club');


router.get('/', (req, res) => {
    Club.find((err, docs)=>{
        if(err) throw err;
        // console.log(docs);
        res.render('home',{teams:docs})        
    }).catch(err=>{
        console.log(err);        
    })
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


router.get('/edit/:id', (req,res, next)=>{

    try {
        Club.findByIdAndUpdate({_id: req.params.id}, (err)=>{
        res.render('home', {});
        });
        throw new Error('BROKEN');
        
      } catch (err) {
        next(err)
      }

    console.log("directing edit");
    
});



module.exports = router;