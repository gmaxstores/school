const express = require("express");
const app = express();
const routes = require("./routes/index");
const mongodb = require("./data/database");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route to all routes
app.use("/", routes)


//connect to database and start server if successful
mongodb.connectToDatabase((err) => {
    if (err) {
        console.error("Failed to connect to the database:", err);
    }
    else {
        app.listen(port);
        console.log(`Server is running on http://localhost:${port} and mongodb is connected`);
    }
});


/* ***********************
* Express Error Handler
* Placed after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  if (err.status) {
    console.error(`Stack: ${err.stack}`);
    console.error(`Status: ${err.status}`);
    console.error(`Message: ${err.message}`);
    res.status(err.status).send({
        status: err.status,
        message: err.message
  });
  } else {
    console.error(`Error at: "${req.originalUrl}": ${err.message}`);
    console.error(`Stack: ${err.stack}`);
    res.status(500).send({
        error: err.message
  });
  }
  
});