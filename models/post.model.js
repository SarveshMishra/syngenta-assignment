const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: { type: String, required: true, minlength: 3, maxlength: 50 },
	description: { type: String, required: true },
	labels: [{ type: String, required: true }],
	authorName: { type: String, required: true },
	authorDetail: { type: Schema.Types.ObjectId, ref: 'User' },
	likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	likesCount: { type: Number, default: 0 },
	published: { type: Boolean, default: false },
	draft: { type: Boolean, default: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);
