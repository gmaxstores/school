const express = require('express');
const router = new express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const studentsRoute = require("./studentsRoute")
const classesRoute = require("./classesRoute");

//route to hello world
router.get("/", (req, res) => {
    res.send("Hello World!");
});

//route to students
router.use("/students", studentsRoute);

//route to classes
router.use("/classes", classesRoute);

//route to api documentation
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));


module.exports = router;