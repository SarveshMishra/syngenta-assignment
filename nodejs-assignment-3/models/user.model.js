const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Currently schema has only name field but we can add more fields in future.
// Like email, password, etc. to make it more secure.
const userSchema = new Schema({
	name: { type: String, required: true, minlength: 3, maxlength: 50 },
	posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
	likes: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
