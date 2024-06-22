import { isUri } from "valid-url";
import Url from "../models/Url.model.js";
import axios from "axios";


const createShortUrl = async (req, res, next) => {
    try {
        const { originalUrl } = req.body;
        const shortUrl = Math.random().toString(16).substring(2, 6);

        if (!originalUrl) {
            // return res.status(400).json(
            //     {
            //         success: false,
            //         message: "originalUrl is required"
            //     }
            // );

            res.status(400);
            return next(new Error("originalUrl is required"));
        }


        // Check if originalUrl is a Valid URL
        if (!isUri(originalUrl)) {
            res.status(400);
            return next(new Error("originalUrl is not a valid URL"));
        }

        // Check if the URL is reachable
        try {
            await axios.get(originalUrl);
        } catch (error) {
            res.status(400);
            return next(new Error("originalUrl is not reachable"));
        }


        // Check if url already exists
        const isUrlExists = await Url.findOne({ originalUrl });
        if (isUrlExists) {
            res.status(400);
            return next(new Error("originalUrl already shortned"));
        }

        const newUrl = await Url.create(
            {
                originalUrl,
                shortUrl

            }
        );

        res.status(201).json(
            {
                success: true,
                newUrl
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500);
        next(new Error("Internal Server Error"));
    }
}


const getUrls = async (req, res, next) => {
    try {
        const urls = await Url.find({});

        res.status(200).json(
            {
                success: true,
                urls
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500);
        next(new Error("Internal Server Error"));
    }
}

const getURL = async (req, res, next) => {
    try {
        const { shortUrl } = req.params;

        if (!shortUrl) {
            res.status(400);
            return next(new Error("shortUrl is required"));
        }

        const url = await Url.findOne({ shortUrl });

        if (!url) {
            res.status(404);
            return next(new Error("URL not found"));
        }

        res.status(200).json(
            {
                success: true,
                url
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500);
        next(new Error("Internal Server Error"));
    }
}



const redirectUrl = async (req, res, next) => {
    try {
        const { shortUrl } = req.params;

        if (!shortUrl) {
            res.status(400);
            return next(new Error("shortUrl is required"));
        }

        const url = await Url.findOne({ shortUrl });

        if (!url) {
            res.status(404);
            return next(new Error("URL not found"));
        }

        res.status(301).redirect(url.originalUrl);
    } catch (error) {
        console.log(error);
        res.status(500);
        next(new Error("Internal Server Error"));
    }
}


const updateUrl = async (req, res, next) => {
    try {
        const { shortUrl } = req.params;
        const { originalUrl } = req.body;

        if (!shortUrl || !originalUrl) {
            res.status(400);
            return next(new Error("shortUrl and originalUrl is required"));
        }

        const url = await Url.findOneAndUpdate({ shortUrl }, { originalUrl }, { new: true });

        if (!url) {
            res.status(404);
            return next(new Error("URL not found"));
        }

        res.status(200).json(
            {
                success: true,
                url
            }
        )

    } catch (error) {
        console.log(error);
        res.status(500);
        next(new Error("Internal Server Error"));
    }
}


const deleteUrl = async (req, res, next) => {
    try {
        const { shortUrl } = req.params;

        if (!shortUrl) {
            res.status(400);
            return next(new Error("shortUrl is required"));
        }

        const deletedUrl = await Url.findOneAndDelete({ shortUrl });

        if (!deletedUrl) {
            res.status(404);
            return next(new Error("URL not found to delete"));
        }

        res.status(200).json(
            {
                success: true,
                message: "URL deleted successfully"
            }
        )

    } catch (error) {
        console.log(error);
        res.status(500);
        next(new Error("Internal Server Error"));
    }
}


export { createShortUrl, getUrls, getURL, redirectUrl, updateUrl, deleteUrl };