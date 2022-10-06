// bring in dotenv
require('dotenv').config();
// bring in express framework
const express = require('express');
//bring in bodyParser
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const requestRoutes = require('./routes/requests');
// instantiate the application server
const app = express();
// use to serve static resources
app.use(express.static('public'));
// use to read the body data from the request
app.use(bodyParser.json());
app.use(
	cors({
		exposedHeaders: 'Authorization',
	})
);
app.use(usersRoutes);
app.use(requestRoutes);

// port the express app is listening on
const PORT = process.env.PORT || 8040;

app.get('/', (req, res) => {
	console.log('get home');
	res.send('Welcome to LAMP API');
});

app.listen(PORT, () => {
	console.log(`API server is listening on port ${PORT}`);
});
