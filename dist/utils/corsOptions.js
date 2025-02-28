"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins = [
    "http://localhost:7779",
];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    optionsSuccessStatus: 200,
};
exports.default = corsOptions;
