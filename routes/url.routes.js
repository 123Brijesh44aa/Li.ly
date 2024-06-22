import express from "express";
import { createShortUrl, deleteUrl, getURL, getUrls, redirectUrl, updateUrl } from "../controllers/url.controller.js";

const router = express.Router();

// Create short url
router.post("/create", createShortUrl);

// Get all urls
router.get("/", getUrls);

// Get a specific URL by shortUrl
router.get("/:shortUrl", getURL);

// Redirect to originalUrl
router.get("/redirect/:shortUrl", redirectUrl);

// Update original url
router.put("/:shortUrl", updateUrl);

// Delete a URL by shortUrl
router.delete("/:shortUrl", deleteUrl);

export default router;