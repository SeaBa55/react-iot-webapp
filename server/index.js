const express = require("express");
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3001;


let ledState = false;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());
// app.use(express.urlencoded());

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    console.log(ledState);
    res.send({ message: ledState });
});

// Handle POST requests to /api route
app.post("/api", (req, res) => {
    console.log(req.body);
    ledState = req.body.message;
    res.send({
        message: "good request"
    });
  });

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});