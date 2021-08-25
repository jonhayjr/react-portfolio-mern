const express = require('express');
//Create express app
const app = express();

//Import Cors
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const {connectionString, DB, collection} = require('./config/config');
//Create new instance of MongoClient
const client = new MongoClient(connectionString);

//Imports asyncHandler middleware function
const { asyncHandler } = require('./middleware/async-handler');

//Create Port variable
const port = process.env.PORT || 5000;

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
  origin: allowedOrigins
};

//Import Router
const projectsRouter = require('./routes/projects');

app.use(cors(corsOptions));

//Use Router route
app.use('/api', projectsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Test the database connection.
(async () => {
  try {
    await client.connect();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


//Set up app listener on port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });