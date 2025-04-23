const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Default to 500 if no status code is provided
    const message = err.message || "Internal server error";

    res.status(statusCode).json({
        success: false,
        message,
    });
};

export {errorHandler};