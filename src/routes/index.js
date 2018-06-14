const router = require('express').Router();
const fs = require('fs');

router.post('/events/eventID', function(req, res, next){
    res.end('post request')
});

router.get('/events', function(req,res,next){
        var fileContents = fs.readFileSync('././mockData/events.json', 'utf8');    
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(fileContents);
        res.end(console.log('get request complete, returning events'));
});



module.exports = router;