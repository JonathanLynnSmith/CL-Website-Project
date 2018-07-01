const router = require('express').Router();
const fs = require('fs');
const mongoose =require('mongoose');
const path = require('path');




router.delete('/events/delete/:eventId', function(req,res,next){
  const Event = mongoose.model('Event');
  const eventId = req.params.eventId;
  // Event.findById(eventId, function(err, event){
  //   console.log(event);
  // })
  Event.findByIdAndRemove(eventId, function (err, event){
    if(err){
      console.log(err);
      return res.status(500).json(err);
    }
    if(!event){
      return res.status(400).json({message: "file not found"});
    }
  })

});



router.put('/events/:eventId', function(req, res, next){
      const Event = mongoose.model('Event');
      const eventId = req.params.eventId;
      Event.findById(eventId, function(err, event){
        if(err){
          console.log(err);
          return res.status(509).json(err);
        }
        if(!event){
          return res.status(400).json({message: "file not found"});
        }

        event.header = req.body.header;
        event.paragraph = req.body.paragraph;

        event.save(function(err, savedFile) {
          if (err) {
            console.error(err);
            return res.status(500).json(err);
          }
          res.json(savedFile);
        }) 
      })
  
});

router.post('/events', function(req, res, next){
    const File = mongoose.model('Event');
    const formData = {
      header: req.body.header,
      paragraph: req.body.paragraph,
    };
  
    File.create(formData, function(err, newFile) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
  
      res.json(newFile);
    });
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

module.exports = router;