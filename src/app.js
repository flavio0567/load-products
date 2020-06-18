const express = require("express");

const app = express();

require("./server/database");

app.use(express.json());
app.use("/", express.static("/"));
app.use(require("./server/routes"));

// csvWriter
//   .writeRecords(data)
//   .then(() => console.log("The CSV file was written successfully"));

module.exports = app;
