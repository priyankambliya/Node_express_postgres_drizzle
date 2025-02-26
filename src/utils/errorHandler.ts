import { NextFunction, Request, Response } from "express";

const uncaughtExceptionHandler = (error: any, origin: any) => {
    console.log("----- Uncaught exception -----");
    console.log(error);
    console.log("----- Exception origin -----");
    console.log(origin);
}

const unhandledRejectionHandler = (reason: any, promise: any) => {
    console.log("----- Unhandled Rejection at -----");
    console.log(promise);
    console.log("----- Reason -----");
    console.log(reason);
}

const unHandledRouteHandler = (req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({
        "success": false,
        "error": {
            "name": "Not Found",
            "status": 404,
            "message": "The requested route does not exist. Please check the URL or refer to the API documentation.",
            "statusCode": 404
        },
        "message": "Route not found"
    })
}

// validation error handler


// common error handler
let commonErrorHandlers = (error: any, res: Response) => {
    const statusCode = error.statusCode || 500
    return res.status(statusCode).json({
        success: false,
        error: {
            name: error.name || "Internal Server Error",
            message: error.message || "Something went wrong, please try again later.",
            status: statusCode,
            statusCode: statusCode,
        },
        message: error.message ?? "An error occurred",
    });
}

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    // Thrown errors 
    if (error instanceof Error) commonErrorHandlers(error, res)
}

export default { uncaughtExceptionHandler, unhandledRejectionHandler, unHandledRouteHandler, errorHandler };