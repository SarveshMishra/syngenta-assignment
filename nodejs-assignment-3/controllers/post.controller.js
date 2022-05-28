const userModel = require('../models/user.model');
const postModel = require('../models/post.model');

const createPost = (req, res) => {
	// Take user id in query and create a new post object with the given user id.
	const authorId = req.query.id;
	const post = new postModel({
		title: req.body.title,
		description: req.body.description,
		labels: req.body.labels,
		author: authorId,
	});

	// Save the post object to the database and return the response.
	let savedPostId;
	post.save((err, post) => {
		if (err) {
			res.status(500).send(err);
		} else {
			savedPostId = post._id;
			// Update the user object with the new post id.
			userModel
				.findByIdAndUpdate(authorId, {
					$push: { posts: savedPostId },
				})
				.exec((err, user) => {
					if (err) {
						res.status(500).send(err);
					} else {
						// Return the saved post id.
						res.status(200).json(post);
					}
				});
		}
	});
};

const updatePost = (req, res) => {
	const postId = req.query.id;
	const post = req.body;

	// Find the post by id and update the published status.
	postModel.findByIdAndUpdate(postId, post, (err, post) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send('Post updated successfully.');
		}
	});
};

const deletePost = (req, res) => {};
const getAllPosts = (req, res) => {
	// Find all posts and return the response.
	// Author name populated with the author name from the user collection.
	const allPost = postModel
		.find({ published: true })
		.populate('author')
		.exec((err, posts) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(posts);
			}
		});
};
const likePost = (req, res) => {
	const userID = req.query.user_id;
	const postID = req.query.post_id;

	// Find the post by id and add the user id to the likes array.
};

module.exports = {
	createPost,
	updatePost,
	deletePost,
	getAllPosts,
	likePost,
};
