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
app.get("/api/webapps", (req, res) => {
    if (data) {
        res.send(data);
    } else {
        res.sendStatus(404);
    }
});

// Get a single record
app.get("/api/webapps/:productId", (req, res) => {
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
app.put("/api/webapps/:productId/update", (req, res) => {
    const productId = req.params.productId;
    const webAppProject = req.body;

    // Find the record in the data array
    const recordIndex = data.findIndex((record) => record.productId === productId);

    if (recordIndex >= 0) {
        // Update the record
        data[recordIndex] = webAppProject;
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

// Add a new record
app.post("/api/webapps/addwebapp", (req, res) => {
    const webAppProject = req.body;
    // Add the record to the start of the data array
    data.unshift(webAppProject);
    res.sendStatus(200);
});

// Delete a record
app.delete("/api/webapps/:productId/deletewebapp", (req, res) => {
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

// Serve the Swagger UI
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});