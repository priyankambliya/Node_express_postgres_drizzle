"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uncaughtExceptionHandler = (error, origin) => {
    console.log("----- Uncaught exception -----");
    console.log(error);
    console.log("----- Exception origin -----");
    console.log(origin);
};
const unhandledRejectionHandler = (reason, promise) => {
    console.log("----- Unhandled Rejection at -----");
    console.log(promise);
    console.log("----- Reason -----");
    console.log(reason);
};
const unHandledRouteHandler = (req, res, next) => {
    res.status(404).json({
        "success": false,
        "error": {
            "name": "Not Found",
            "status": 404,
            "message": "The requested route does not exist. Please check the URL or refer to the API documentation.",
            "statusCode": 404
        },
        "message": "Route not found"
    });
};
// validation error handler
// common error handler
let commonErrorHandlers = (error, res) => {
    var _a;
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        error: {
            name: error.name || "Internal Server Error",
            message: error.message || "Something went wrong, please try again later.",
            status: statusCode,
            statusCode: statusCode,
        },
        message: (_a = error.message) !== null && _a !== void 0 ? _a : "An error occurred",
    });
};
const errorHandler = (error, req, res, next) => {
    // Thrown errors 
    if (error instanceof Error)
        commonErrorHandlers(error, res);
};
exports.default = { uncaughtExceptionHandler, unhandledRejectionHandler, unHandledRouteHandler, errorHandler };
