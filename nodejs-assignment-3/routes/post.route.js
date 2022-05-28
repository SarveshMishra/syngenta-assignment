const express = require('express');
const post = express.Router();
const postControllers = require('../controllers/post.controller');

post.use(express.json());

// Endpoint to get all posts from the database which are published
post.get('/all', postControllers.getAllPosts);

// Endpoint to create new post in the database with the given author id in query.
post.post('/create', postControllers.createPost);

/* Endpoint to update a post by id from the database. It can be used for 
toggling the published status. By default every post have published status as
 false and when user publish the post it will be updated to true so from 
 frontend we can update the post status when user want to publish the post.*/
post.patch('/update', postControllers.updatePost);

// Endpoint to delete a post by id from the database
post.delete('/delete', postControllers.deletePost);


// Endpoint to like a post by id from the database with user id who liked the post both id from query
post.post('/like', postControllers.likePost);
module.exports = post;
