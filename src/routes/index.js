const router = require('express').Router();
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');

//Models
const Event = require('../models/Event.model.js');
const User = require('../models/User.model.js');



//////////////////////////////////////////////////////////////////////////
//---------------------------  Event Routes  ---------------------------//
//////////////////////////////////////////////////////////////////////////

//DELETE /Events
router.delete('/events/:eventId', function (req, res, next) {
  const eventId = req.params.eventId;
  console.log(req.params.eventId)

  if (req.session.userId) {
    Event.findById(eventId, function (err, event) {
      if (err) {
        console.log(err);
        return res.status(509).json(err);
      }
      if (!event) {
        return res.status(400).json({ message: "file not found" });
      }

      event.deleted = true;

      event.save(function (err, savedFile) {
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
router.put('/events/:eventId', function (req, res, next) {
  const eventId = req.params.eventId;

  if (req.session.userId) {
    Event.findById(eventId, function (err, event) {
      if (err) {
        console.log(err);
        return res.status(509).json(err);
      }
      if (!event) {
        return res.status(400).json({ message: "file not found" });
      }

      event.header = req.body.header;
      event.paragraph = req.body.paragraph;

      event.save(function (err, savedFile) {
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
router.post('/events', function (req, res, next) {
  const formData = {
    header: req.body.header,
    paragraph: req.body.paragraph,
  };

  if (req.session.userId) {
    Event.create(formData, function (err, newFile) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      res.json(newFile);
    });
  } else { console.log(req.sessionID) }

});

//GET /Events
router.get('/events', function (req, res, next) {
  Event.find({ deleted: { $ne: true } }, function (err, events) {
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
router.post('/login', function (req, res, next) {
  if (req.body.username &&
    req.body.password) {

    //*Authenticate Login**//
    User.authenticate(req.body.username, req.body.password, function (err, user) {
      if (err || !user) {
        let error = new Error('Wrong email or password.');
        error.status = 401;
        res.send(error);
      } else {
        req.session.userId = user._id;
        return res.status(202).json();
      }
    });

    //**Create Login**//
    //**Turned off unless needed**//  
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
  } 
});


module.exports = router;