const mongoose = require("mongoose");


const DB_ERROR_NAMES = [
    "MongooseError",
    "MongoNetworkError",
    "MongoServerSelectionError",
    "MongoTimeoutError",
];


const isDatabaseUnavailable = (error) => {

    if (!error) {
        return false;
    }

    const name = error.name || "";

    if (DB_ERROR_NAMES.includes(name)) {

        return true;

    }

    return (
        typeof error.message === "string" &&
        error.message.includes(
            "buffering timed out"
        )
    );

};


// Sends a 503 when MongoDB is unreachable so the
// admin can tell a config problem from a bad request.
const handleControllerError = (
    res,
    error,
    fallbackMessage
) => {

    if (isDatabaseUnavailable(error)) {

        return res.status(503).json({
            success: false,
            message:
                "Database is unavailable. Check the MongoDB connection in backend/.env.",
        });

    }

    return res.status(500).json({
        success: false,
        message: fallbackMessage,
    });

};


const dbStatus = () => {

    const states = [
        "disconnected",
        "connected",
        "connecting",
        "disconnecting",
    ];

    return states[
        mongoose.connection.readyState
    ] || "unknown";

};


module.exports = {
    isDatabaseUnavailable,
    handleControllerError,
    dbStatus,
};
