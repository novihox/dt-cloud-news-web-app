/**
 * Error Handling Middleware
 * Catches any errors thrown in the app and sends a clean response
 */
const errorMiddleware = (err, req, res, next) => {
    console.error('Error:', err.message)

    // Default to 500 if no status code was set
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode

    res.status(statusCode).json({
        message: err.message,
        // Only show stack trace in development
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = errorMiddleware
