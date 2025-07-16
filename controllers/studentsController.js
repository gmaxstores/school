const studentsModel = require('../models/studentsModel');

const studentsController = {};

// function to get all students
studentsController.getAllStudents = async (req, res, next) => {
    try {
        const students = await studentsModel.getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        //console.error("Error fetching students:", error);
        //res.status(500)
        next({
            status: 500,
            message: `Error fetching students: ${error.message}`,
            stack: error.stack
        });
    }
}

//function to get a student by matric number
studentsController.getStudentByMatricNumber = async (req, res, next) => {
    const matricNumber = req.params.matricNumber;
    try {
        const student = await studentsModel.getStudentByMatricNumber(matricNumber);
        if (student.length === 0) {
            next({
                status: 404,
                message: `Student with matric number ${matricNumber} not found`
            })
            //return res.status(404).json({ message: "Student not found" });
        } else {
            res.status(200).send(student[0]);
        }
    } catch (error) {
        next({
            status: 500,
            message: `Error fetching student with matric number ${matricNumber}: ${error.message}`,
            stack: error.stack
        })
        //res.status(500).send({ message: error.message });
    }
}

//function to add a new student
studentsController.addStudent = async (req, res, next) => {
    const studentData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        matricNumber: req.body.matricNumber,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        faculty: req.body.faculty,
        department: req.body.department,
        yearOfEntry: req.body.yearOfEntry,
        address: req.body.address
    }
    try {
        const result = await studentsModel.addStudent(studentData);
        res.status(201).json({ message: "Student added successfully", studentId: result.insertedId });
    } catch (error) {
        next({
            status: 500,
            message: `Error adding new student: ${error.message}`,
            stack: error.stack
        })
    }
}

//function to update a student by matric number
studentsController.updateStudentByMatricNumber = async (req, res, next) => {
    const matricNumber = req.params.matricNumber;
    const updateData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        matricNumber: req.body.matricNumber,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        faculty: req.body.faculty,
        department: req.body.department,
        yearOfEntry: req.body.yearOfEntry,
        address: req.body.address
    }
    try {
        const result = await studentsModel.updateStudentByMatricNumber(matricNumber, updateData);
        if (result.modifiedCount === 0) {
            //return res.status(404).send({ message: "Student not found or no changes made" });
            next({
                status: 404,
                message: `Student with matric number ${matricNumber} not found or no changes made`
            });
        } else {
            res.status(200).send({ message: "Student updated successfully", modifiedCount: result.modifiedCount });
        }
    } catch (error) {
        //res.status(500).send({ message: error.message });
        next({
            status: 500,
            message: `Error updating student with matric number ${matricNumber}: ${error.message}`,
            stack: error.stack
        });
    }
}

//function to delete a student by matric number
studentsController.deleteStudentByMatricNumber = async (req, res, next) => {
    const matricNumber = req.params.matricNumber;
    try {
        const result = await studentsModel.deleteStudentByMatricNumber(matricNumber);
        if (result.deletedCount === 0) {
            next({
                status: 404,
                message: `Student with matric number ${matricNumber} not found`
            });
        } else {
            res.status(200).send({ message: "Student deleted successfully" });
        }
    } catch (error) {
        //res.status(500).send({ message: error.message });
        next({
            status: 500,
            message: `Error deleting student with matric number ${matricNumber}: ${error.message}`,
            stack: error.stack
        });
    }
}

module.exports = studentsController;
