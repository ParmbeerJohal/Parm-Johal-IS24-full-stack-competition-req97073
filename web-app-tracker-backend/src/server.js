import express from "express";
import * as fs from 'fs';
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

var data;

// Read data from JSON file
fs.readFile("./data.json", "utf8", (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }

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
    const recordIndex = data.findIndex((record) => record.productId === productId);

    if (recordIndex >= 0) {
        data[recordIndex] = webAppProject;
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

// Add a new record
app.post("/api/webapps/addwebapp", (req, res) => {
    const webAppProject = req.body;
    data.push(webAppProject);
    res.sendStatus(200);
});

// Delete a record
app.delete("/api/webapps/:productId/deletewebapp", (req, res) => {
    const productId = req.params.productId;
    const recordIndex = data.findIndex((record) => record.productId === productId);

    if (recordIndex >= 0) {
        data.splice(recordIndex, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});