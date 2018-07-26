const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    header: String,
    paragraph: String,
    created_at: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
  });


const Event = mongoose.model("Event", EventSchema);
module.exports = Event;

//Seeding Method
//Seeds the database if database  have no data 
Event.count({}, function(err, count) {
    if (err) {
      throw err;
    }

    if (count > 0) return ;

    const events = require('./event.seed.json');
    Event.create(events, function(err, newEvents) {
      if (err) {
        throw err;
      }
      console.log("DB seeded")
  });
});