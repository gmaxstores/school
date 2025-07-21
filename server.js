const express = require("express");
const app = express();
const routes = require("./routes/index");
const mongodb = require("./data/database");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: "school-kingdom",
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());

//route to all routes
app.use("/", routes)


//passport configuration for github OAuth
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // Here you can save the user profile to your database if needed
    return done(null, profile);
  }
));

// Serialize user to save in session
passport.serializeUser((user, done) => {
  done(null, user);
});
// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/auth/github/callback", passport.authenticate("github", {
  failureRedirect: "/api-docs", session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

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