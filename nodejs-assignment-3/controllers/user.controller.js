const userModel = require('../models/user.model');
const postModel = require('../models/post.model');

const createUser = (req, res) => {
	// Create a new user object from the request body.
	const user = new userModel({
		name: req.body.name,
		posts: [],
		likes: [],
		createdAt: new Date(),
		updatedAt: new Date(),
	});

	// Save the user object to the database and return the response.
	user.save((err, user) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(user);
		}
	});
};

const getAllUsers = (req, res) => {
	// Later we can use auth middleware to restrict this endpoint to only authenticated users.
	// Find all users and return the response.
	userModel.find({}, (err, users) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(users);
		}
	});
};

const updateUser = (req, res) => {
	const id = req.query.id;
	const user = {
		name: req.body.name,
		posts: req.body.posts,
		likes: req.body.likes,
		updatedAt: new Date(),
	};
	// Find the user by id and update the user object.
	userModel.findByIdAndUpdate(id, user, (err, user) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).json('User updated successfully');
		}
	});
};

module.exports = {
	createUser,
	getAllUsers,
	updateUser,
};
