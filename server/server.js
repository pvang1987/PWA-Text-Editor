// Import the Express.js framework
const express = require('express');

// Create an Express application instance
const app = express();

// Define the port on which the server will listen, use process.env.PORT or default to 3000
const PORT = process.env.PORT || 3000;

// Serve static files from the '../client/dist' directory
app.use(express.static('../client/dist'));

// Parse incoming requests with urlencoded and JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Require and configure HTML routes using the express app
require('./routes/htmlRoutes')(app);

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Now listening on port: http://localhost:${PORT}`));
