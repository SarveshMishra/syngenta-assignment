const userModel = require('../models/user.model');
const postModel = require('../models/post.model');

const createPost = (req, res) => {
	// Take user id in query and create a new post object with the given user id.
	const authorId = req.query.author_id;
	let authorName;

	// Find the author name from the user collection it also checks if the user is valid or not.
	userModel.findById(authorId, (err, user) => {
		if (err) {
			res.status(500).json({
				message: 'Internal server error',
			});
		} else if (!user) {
			res.status(404).json({
				message: 'User not found',
			});
		} else {
			authorName = user.name;
			const post = new postModel({
				title: req.body.title,
				description: req.body.description,
				labels: req.body.labels,
				authorDetail: authorId,
				authorName: authorName,
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

const searchPost = (req, res) => {
	const title = req.query.title;
	const author = req.query.author;

	// Find the author id from the user collection.

	// Find the post by title.
	if (title && !author) {
		postModel.find({ title: title }, (err, posts) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).json(posts);
			}
		});
	} else if (title && author) {
		postModel.find({ title: title, authorName: author }, (err, posts) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).json(posts);
			}
		});
	} else if (!title && author) {
		postModel.find({ authorName: author }, (err, posts) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).json(posts);
			}
		});
	}
};
const getAllPosts = (req, res) => {
	// Sort the posts as requested from frontend, by default returning the latest posts. If likes is requested with -1 then return in descending order of likes count.

	if (req.query.likes == '1' || req.query.likes == '-1') {
		const sort = { likesCount: req.query.likes };
		postModel
			.find({ published: true })
			.sort(sort)
			.populate('authorDetail')
			.exec((err, posts) => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).send(posts);
				}
			});
	} else {
		const sort = { createdAt: -1 };
		postModel
			.find({ published: true })
			.sort(sort)
			.populate('authorDetail')
			.exec((err, posts) => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).send(posts);
				}
			});
	}

	// Find all posts and return the response.
	// Author name populated with the author name from the user collection.
};
const likePost = (req, res) => {
	const userId = req.query.user_id;
	const postId = req.query.post_id;

	// Find the post by id and add the user id to the likes array.
	postModel
		.findById(postId)
		.then((post) => {
			if (post) {
				if (post.likes.includes(userId)) {
					post.likesCount--;
					post.likes.splice(post.likes.indexOf(userId), 1);
					post.save((err, post) => {
						if (err) {
							res.status(500).json({
								message: 'Error while liking post',
								error: err,
							});
						}
						res.status(200).json({
							message: 'Post unlike successfully',
							post: post,
						});
					});
				} else {
					post.likes.push(userId);
					post.likesCount++;
					post.save((err, post) => {
						if (err) {
							res.status(500).json({
								message: 'Error while liking post',
								error: err,
							});
						}
						res.status(200).json({
							message: 'Post liked successfully',
							post: post,
						});
					});
				}
			} else {
				res.status(404).json({
					message: 'post not found',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Error while liking post',
				error: err,
			});
		});
};

module.exports = {
	createPost,
	updatePost,
	searchPost,
	getAllPosts,
	likePost,
};
