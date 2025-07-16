const express = require("express");
const router = new express.Router();
const classesController = require("../controllers/classesController");
const classesValidator = require("../utilities/classes-validation");
const utilities = require("../utilities/index")

//route to get all classes
router.get("/", utilities.handleErrors(classesController.getAllClasses));

//route to get a class by class code and name
router.get("/:classCode/:className", utilities.handleErrors(classesController.getClassByCodeAndName));

//route to create a new class
router.post("/new", classesValidator.addClassRules(), classesValidator.checkClassData, utilities.handleErrors(classesController.addClass));

//route to update a class by class code and name
router.put("/update/:classCode/:className", classesValidator.addClassRules(), classesValidator.checkClassData, utilities.handleErrors(classesController.updateClassByCodeAndName));

//route to delete a class by class code and name
router.delete("/delete/:classCode/:className", utilities.handleErrors(classesController.deleteClassByCodeAndName));

module.exports = router;