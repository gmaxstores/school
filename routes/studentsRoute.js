const express = require("express");
const router = new express.Router();
const studentsController = require("../controllers/studentsController");
const studentsValidator = require("../utilities/students-validation");
const utilities = require("../utilities/index")

//route to get all students
router.get("/", utilities.handleErrors(studentsController.getAllStudents));

//route to get a student by matric number
router.get("/:matricNumber", utilities.handleErrors(studentsController.getStudentByMatricNumber));

//route to create a new student
router.post("/new", utilities.isAuthenticated, studentsValidator.addStudentRules(), studentsValidator.checkStudentData, utilities.handleErrors(studentsController.addStudent));

//route to update a student by matric number
router.put("/update/:matricNumber", utilities.isAuthenticated, studentsValidator.addStudentRules(), studentsValidator.checkStudentData, utilities.handleErrors(studentsController.updateStudentByMatricNumber));

//route to delete a student by matric number
router.delete("/delete/:matricNumber", utilities.isAuthenticated, utilities.handleErrors(studentsController.deleteStudentByMatricNumber));

module.exports = router;