const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    let success = false;

    if (err.name === "ValidationError") {
        statusCode = 400;
    }

    if (err.name === "CastError") {
        statusCode = 404;
        message = "Resource not found";
    }

    return res.status(statusCode).json( 
        {
            success,
            message
        }
    );


}


export default errorHandler;