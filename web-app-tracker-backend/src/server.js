/**
 * @file Server.js
 * @author Parm Johal
 * @description This is the main entry point for the web app tracker backend.
 * It uses express to create a REST API for the web app tracker.
 */

import express from "express";
import * as fs from 'fs';
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json" };
import { v4 as uuidv4 } from "uuid";

// Create a new express application instance
const app = express();

// Configure express to use body-parser as middle-ware.
app.use(express.json());

// Enable CORS
app.use(cors());

var data;

// Read data from JSON file
fs.readFile("./data.json", "utf8", (err, jsonString) => {
    // If there's an error reading the file, log it and return
    if (err) {
        console.log("File read failed:", err);
        return;
    }

    // Parse the JSON string to an object
    data = JSON.parse(jsonString);
});

// Get all records
app.get("/api/products", (req, res) => {
    if (data) {
        res.send(data);
    } else {
        res.sendStatus(404);
    }
});

// Get a single record
app.get("/api/products/:productId", (req, res) => {
    const productId = req.params.productId;

    // Find the record in the data array
    const record = data.find((record) => record.productId === productId);

    if (record) {
        res.send(record);
    } else {
        res.sendStatus(404);
    }
});

// Update a single record
app.put("/api/products/:productId/update", (req, res) => {
    const productId = req.params.productId;
    const webAppProduct = req.body;

    // Find the record in the data array
    const recordIndex = data.findIndex((record) => record.productId === productId);

    if (recordIndex >= 0) {
        // Update the record
        data[recordIndex] = webAppProduct;
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

// Add a new record
app.post("/api/products/add", (req, res) => {
    const webAppProduct = req.body;

    // Generate a unique product ID
    const newProductId = uuidv4();
    
    // If the product ID is already in use, generate a new one
    while (data.find((record) => record.productId === newProductId)) {
        newProductId = uuidv4();
    }

    // Add the new product ID to the web app project object
    webAppProduct.productId = newProductId;

    // Add the record to the start of the data array
    data.unshift(webAppProduct);
    res.sendStatus(200);
});

// Delete a record
app.delete("/api/products/:productId/delete", (req, res) => {
    const productId = req.params.productId;
    const recordIndex = data.findIndex((record) => record.productId === productId);

    if (recordIndex >= 0) {
        // Delete the record
        data.splice(recordIndex, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

// API health check
app.get("/api/health", (req, res) => {
    res.sendStatus(200);
});

// Serve the Swagger UI
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});