const mongodb = require("../data/database");

const studentsModel = {};

// function to get all students
studentsModel.getAllStudents = async () => {
    try {
        const students = await mongodb.getDataBase().db("school").collection("students").find({}).toArray();
        return students;
    } catch (error) {
        return error.message;
    }
}

//function to get a student by matric number
studentsModel.getStudentByMatricNumber = async (matricNumber) => {
    try {
        const student = await mongodb.getDataBase().db("school").collection("students").find({ matricNumber: matricNumber}).toArray();
        return student;
    } catch (error) {
        return error.message;
    }
}

//function to add a new student
studentsModel.addStudent = async (studentData) => {
    try {
        const result = await mongodb.getDataBase().db("school").collection("students").insertOne(studentData);
        return result;
    } catch (error) {
        return error.message;
    }
}

// function to update a student by matric number
studentsModel.updateStudentByMatricNumber = async (matricNumber, updateData) => {
    try {
        const result = await mongodb.getDataBase().db("school").collection("students").updateOne(
            { matricNumber: matricNumber },
            { $set: updateData }
        );
        return result;
    } catch (error) {
        return error.message;
    }
}

// function to delete a student by matric number
studentsModel.deleteStudentByMatricNumber = async (matricNumber) => {
    try {
        const result = await mongodb.getDataBase().db("school").collection("students").deleteOne({ matricNumber: matricNumber });
        return result;
    } catch (error) {
        return error.message;
    }
}

module.exports = studentsModel;