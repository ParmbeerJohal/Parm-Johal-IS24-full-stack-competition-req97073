import express from "express";
import * as fs from 'fs';

const app = express();
app.use(express.json());

var data;

// Read data from JSON file
fs.readFile("./data.json", "utf8", (err, jsonString) => {
    if (err) {
    console.log("File read failed:", err);
    return;
    }

    data = JSON.parse(jsonString);
});

// Get a single record
function getWebAppRecord(productId) {
    var dataArray = data;
    const record = dataArray.find((record) => record.productId === productId);
    if (record) {
        return record;
    }

    return null;
}

// Update a single record
function updateWebAppRecord(webAppProject, productId) {
    var dataArray = data;
    const recordIndex = dataArray.findIndex((record) => record.productId === productId);
    if (recordIndex >= 0) {
        dataArray[recordIndex] = webAppProject;
        return webAppProject;
    }

    return null;
}

// Get all records
app.get("/data", (req, res) => {
    if(data) {
        res.send(data);
    } else {
        res.sendStatus(404);
    }
});

// Get a single record
app.get("/data/:productId", (req, res) => {
    const productId = req.params.productId;
    var record = getWebAppRecord(productId);
    if(record) {
        res.send(record);
    } else {
        res.sendStatus(404);
    }
});

// Update a single record
app.put("/data/:productId/update", (req, res) => {
    const productId = req.params.productId;
    const webAppProject = req.body;
    var record = updateWebAppRecord(webAppProject, productId);
    if(record) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

// Add a new record
app.post("/addwebapp", (req, res) => {
    const webAppProject = req.body;
    data.push(webAppProject);
    res.sendStatus(200);
});

// Delete a record
app.delete("/data/:productId/delete", (req, res) => {
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