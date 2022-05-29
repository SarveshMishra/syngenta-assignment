require('dotenv').config();
const mongoose = require('mongoose');

const dbConnect = () => {
	const url = process.env.MONGODB_URI;
	mongoose.connect(url);
	// For error handling
	mongoose.connection.on('error', (err) => {
		console.log(`Mongoose connection error: ${err}`);
	});
	// For successfully connection
	mongoose.connection.on('open', () => {
		console.log('Mongoose connected successfully');
	});
};

module.exports = dbConnect;
