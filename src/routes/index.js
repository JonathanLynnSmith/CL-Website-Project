const router = require('express').Router();
const fs = require('fs');
const mongoose =require('mongoose');
const path = require('path');

router.post('/events/eventID', function(req, res, next){
    res.end('post request')
});

router.get('/events', function(req,res,next){
    mongoose.model('Event').find({}, function(err, events) {
        if (err) {
        console.log(err);
        return res.status(500).json(err);
        }
        res.json(events);
    });
});

//*** When are headers Needed????***
// router.get('/events', function(req,res,next){
//         var fileContents = fs.readFileSync('././mockData/events.json', 'utf8');    
//         res.writeHead(200, {'Content-Type': 'application/json'}); 
//         res.write(fileContents);
//         res.end(console.log('get request complete, returning events'));
// });



module.exports = router;