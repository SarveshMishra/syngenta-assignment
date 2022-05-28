const express = require('express');
const user = express.Router();
user.use(express.json());
const userControllers = require('../controllers/user.controller');

// Endpoint to create new user in the database
user.post('/create', userControllers.createUser);

// Endpoint to get all users from the database
user.get('/all', userControllers.getAllUsers);

// Endpoint to update a user profile by id from the database
user.patch('/update', userControllers.updateUser);


module.exports = user;
