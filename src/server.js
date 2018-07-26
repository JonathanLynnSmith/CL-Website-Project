const express = require('express');
const session = require('express-session');
const config = require('./config');
const path = require('path');
const app = express();
const router = require('./routes');
const publicPath = path.resolve(__dirname, '../public');
const loginPath = path.resolve(__dirname, '../login');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// sessions for tracking logins
app.use(session({
  secret: 'HOA',
  resave: true,
  saveUninitialized: false
}));

//db connection string
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);

//middleware
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use('/login', express.static(loginPath))
app.use('/api', router);
app.use('/admin', express.static(publicPath))
app.use('/', router);


//404 handler///////////////////////
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status =404;
//   next(err);
// });

// app.use((err,req,res,next) => {
//   res.locals.error = err;
//   res.status(err.status);
// //need to add view to display 404
//   next();
// });
/////////////////////////////////////


app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});

