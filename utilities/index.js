//function to check if the user is authenticated
const util = {};

util.isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return next({
            status: 401,
            message: "You are not authenticated. Please log in."
        });
    }
}


//General error handling middleware
util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = util;