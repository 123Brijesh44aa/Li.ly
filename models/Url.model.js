
import express from "express";
import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        originalUrl: {
            type: String,
            required: true
        },
        shortUrl: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }

);


const Url = mongoose.model("Url", urlSchema);

export default Url;