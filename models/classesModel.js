const mongodb = require("../data/database");

const classesModel = {};

// function to get all classes
classesModel.getAllClasses = async () => {
    try {
        const classes = await mongodb.getDataBase().db("school").collection("classes").find({}).toArray();
        return classes;
    } catch (error) {
        return error.message;
    }
}

//function to get a class by class code and name
classesModel.getClassByCodeAndName = async (classCode, className) => {
    try {
        const classs = await mongodb.getDataBase().db("school").collection("classes").find({ classCode: classCode, className: className}).toArray();
        return classs;
    } catch (error) {
        return error.message;
    }
}

//function to add a class
classesModel.addClass = async (classData) => {
    try {
        const result = await mongodb.getDataBase().db("school").collection("classes").insertOne(classData);
        return result;
    } catch (error) {
        return error.message;
    }
}

// function to update a class by class code and name
classesModel.updateClassByCodeAndName = async (classCode, className, updateData) => {
    try {
        const result = await mongodb.getDataBase().db("school").collection("classes").updateOne(
            { classCode: classCode, className: className },
            { $set: updateData }
        );
        return result;
    } catch (error) {
        return error.message;
    }
}

// function to delete a class by class code and name
classesModel.deleteClassByCodeAndName = async (classCode, className) => {
    try {
        const result = await mongodb.getDataBase().db("school").collection("classes").deleteOne({ classCode: classCode, className: className });
        return result;
    } catch (error) {
        return error.message;
    }
}

module.exports = classesModel;