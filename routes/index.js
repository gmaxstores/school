const express = require('express');
const router = new express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const studentsRoute = require("./studentsRoute")
const classesRoute = require("./classesRoute");
const passport = require('passport');


router.get("/", (req, res) => {
    console.log(req.session.user);
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out")
});

//route to students
router.use("/students", studentsRoute);

//route to classes
router.use("/classes", classesRoute);

//route to login
router.get("/login", passport.authenticate("github"), (req, res) => {})

//route to logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    })
})

//route to api documentation
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));


module.exports = router;