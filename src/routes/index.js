const router = require('express').Router();
const fs = require('fs');
const mongoose =require('mongoose');
const path = require('path');

//Models
const Event = require('../models/Event.model.js');
const User = require('../models/User.model.js');



//////////////////////////////////////////////////////////////////////////
//---------------------------  Event Routes  ---------------------------//
//////////////////////////////////////////////////////////////////////////

//DELETE /Events
router.delete('/events/:eventId', function(req,res,next){
  const eventId = req.params.eventId;
  console.log(req.params.eventId)

  if(req.session.userId){
    Event.findById(eventId, function(err, event){
      if(err){
        console.log(err);
        return res.status(509).json(err);
      }
      if(!event){
        return res.status(400).json({message: "file not found"});
      }
  
      event.deleted = true;
  
      event.save(function(err, savedFile) {
        if (err) {
          console.error(err);
          return res.status(500).json(err);
        }
        res.json(savedFile);
      }) 
    });
  }

  
});

//UPDATE /events/eventId
router.put('/events/:eventId', function(req, res, next){
      const eventId = req.params.eventId;

      if(req.session.userId){
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
  
          Event.save(function(err, savedFile) {
            if (err) {
              console.error(err);
              return res.status(500).json(err);
            }
            res.json(savedFile);
          }) 
        })
      }
      
  
});

//POST /Events
router.post('/events', function(req, res, next){
    const formData = {
      header: req.body.header,
      paragraph: req.body.paragraph,
    };
  
    if(req.session.userId){
      Event.create(formData, function(err, newFile) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
  
      res.json(newFile);
    });
    } else {console.log(req.sessionID)}
    
});

//GET /Events
router.get('/events', function(req,res,next){
    Event.find({deleted: {$ne: true}}, function(err, events) {
      if (err) {
      console.log(err);
      return res.status(500).json(err);
      }
      res.json(events);
  });   
});




//////////////////////////////////////////////////////////////////////////
//---------------------------  Login Routes  ---------------------------//
//////////////////////////////////////////////////////////////////////////

//POST /Login
router.post('/login', function(req, res, next){
  if(req.body.username &&
    req.body.password){

      User.authenticate(req.body.username,req.body.password, function(err,user){
        if(err || !user){
          let error = new Error('Wrong email or password.');
          error.status = 401;
          console.log(error);
          res.send(error);
        } else {
          req.session.userId = user._id;
          res.json(req.sessionID);
        }
      });

      // Create Login *turned off*
      // let loginData = {
      //   username: req.body.username,
      //   password: req.body.password
      // }

      // User.create(loginData,function(err, newLogin){
      //   if(err){
      //     console.log(err);
      //     return res.status(500).json(err);
      //   }
      //   res.json(newLogin);
      // });

    } else {
      let err = new Error('All Fields Required');
      err.status = 400;
      console.log(err)
      return res.json(err);
    }
});


module.exports = router;