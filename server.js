import { configDotenv } from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/url.routes.js";
import errorHandler from "./middlewares/error.js";
import ExpressMongoSanitize from "express-mongo-sanitize";
import { JSDOM } from "jsdom";
import purify from "dompurify";


configDotenv();

// Express App
const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(ExpressMongoSanitize());


// XSS protection
const { window } = new JSDOM("");
const DOMPurify = purify(window);
app.use((req, res, next) => {
    if (req.body) {
        for (let key in req.body) {
            req.body[key] = DOMPurify.sanitize(req.body[key]);
        }
    }
    next();
})

// Routes
app.use("/api/urls", urlRoutes);

// Error handler
app.use(errorHandler);

// Start the server
const startServer = () => {
    try {
        // Connect to db
        connectDB();
        // Start & listen to the requests
        app.listen(port, () => {
            console.log(`Server Started listening on port: ${port}`);
        });
    } catch (error) {
    }
}

startServer();