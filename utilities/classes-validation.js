const { body, validationResult } = require("express-validator")
const validate = {}

// validation for adding a new student
validate.addClassRules = () =>{
    return [
        body("classCode")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1})
            .withMessage("Class code is required and must be at least 1 character long"),
        body("className")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1})
            .withMessage("Class name is required and must be at least 1 character long"),
        body("duration")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1})
            .withMessage("Duration is required and must be at least 1 character long"),
        body("creditUnits")
            .trim()
            .escape()
            .notEmpty()
            .isInt({ min: 1})
            .withMessage("Credit units are required and must be at least 1")
    ]
}


// middleware to validate the rquest
validate.checkClassData = (req, res, next) => {
    let errors = []
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        //console.error("Validation errors:", errors.array());
        //return res.status(404).json({ errors: errors.array() });
        next({
            status: 400,
            message: `Validation errors: ${errors.array().map(err => err.msg).join(", ")}`
        });
    }
    next();
}

module.exports = validate;