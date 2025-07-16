const classesModel = require('../models/classesModel');

const classesController = {};

// function to get all classes
classesController.getAllClasses= async (req, res, next) => {
    try {
        const classes = await classesModel.getAllClasses();
        res.status(200).json(classes);
    } catch (error) {
        next({
            status: 500,
            message: `Error fetching classes: ${error.message}`,
            stack: error.stack
        });
    }
}

//function to get a class by class code and name
classesController.getClassByCodeAndName = async (req, res, next) => {
    const classCode = req.params.classCode;
    const className = req.params.className;
    try {
        const classs = await classesModel.getClassByCodeAndName(classCode, className);
        if (classs.length === 0) {
            next({
                status: 404,
                message: `${className} ${classCode} class not found`
            })
        } else {
            res.status(200).send(classs[0]);
        }
    } catch (error) {
        next({
            status: 500,
            message: `Error fetching ${className} ${classCode} class: ${error.message}`,
            stack: error.stack
        })
        //res.status(500).send({ message: error.message });
    }
}

//function to add a new class
classesController.addClass = async (req, res, next) => {
    const classData = {
        classCode: req.body.classCode,
        className: req.body.className,
        creditUnits: req.body.creditUnits,
        duration: req.body.duration
    }
    try {
        const result = await classesModel.addClass(classData);
        res.status(201).json({ message: "Class added successfully", classId: result.insertedId });
    } catch (error) {
        next({
            status: 500,
            message: `Error adding new class: ${error.message}`,
            stack: error.stack
        })
    }
}

//function to update a class by class code and name
classesController.updateClassByCodeAndName = async (req, res, next) => {
    const classCode = req.params.classCode;
    const className = req.params.className;
    const updateData = {
        classCode: req.body.classCode,
        className: req.body.className,
        creditUnits: req.body.creditUnits,
        duration: req.body.duration
    }
    try {
        const result = await classesModel.updateClassByCodeAndName(classCode, className, updateData);
        if (result.modifiedCount === 0) {
            next({
                status: 404,
                message: `${className} ${classCode} not found or no changes made`
            });
        } else {
            res.status(200).send({ message: "Class updated successfully", modifiedCount: result.modifiedCount });
        }
    } catch (error) {
        //res.status(500).send({ message: error.message });
        next({
            status: 500,
            message: `Error updating ${className} ${classCode} class: ${error.message}`,
            stack: error.stack
        });
    }
}

//function to delete a class by class code and name
classesController.deleteClassByCodeAndName = async (req, res, next) => {
    const classCode = req.params.classCode;
    const className = req.params.className;
    try {
        const result = await classesModel.deleteClassByCodeAndName(classCode, className);
        if (result.deletedCount === 0) {
            next({
                status: 404,
                message: `${className} ${classCode} class not found`
            });
        } else {
            res.status(200).send({ message: "Class deleted successfully" });
        }
    } catch (error) {
        //res.status(500).send({ message: error.message });
        next({
            status: 500,
            message: `Error deleting ${className} ${classCode} class: ${error.message}`,
            stack: error.stack
        });
    }
}

module.exports = classesController;
