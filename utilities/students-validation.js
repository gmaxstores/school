const { body, validationResult } = require("express-validator")
const validate = {}

// validation for adding a new student
validate.addStudentRules = () =>{
    return [
        body("firstName")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1})
            .withMessage("First name is required and must be at least 1 character long"),
        body("lastName")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1})
            .withMessage("Last name is required and must be at least 1 character long"),
        body("matricNumber")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 11, max: 11})
            .withMessage("First name is required and must be 11 digits long"),
        body("age")
            .trim()
            .escape()
            .notEmpty()
            .isInt({ min: 16, max: 100 })
            .withMessage("Age is required and must be between 16 and 100"),
        body("email")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .normalizeEmail()
            .withMessage("Email is required and must be a valid email address"),
        body("phoneNumber")
            .trim()
            .escape()
            .notEmpty()
            .isMobilePhone("any")
            .withMessage("Phone number is required and must be a valid phone number"),
        body("faculty")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1})
            .withMessage("Faculty is required and must be at least 1 character long"),
        body("department")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1})
            .withMessage("Department is required and must be at least 1 character long"),
        body("yearOfEntry")
            .trim()
            .escape()
            .notEmpty()
            .isInt({ min: 2000, max: new Date().getFullYear() })
            .withMessage("Year of entry is required and must be a valid year between 2000 and the current year"),
        body("address")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1})
            .withMessage("Address is required and must be at least 1 character long"),
        body("gender")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1})
            .withMessage("Gender is required and must be at least 1 character long")
    ]
}


// middleware to validate the rquest
validate.checkStudentData = (req, res, next) => {
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