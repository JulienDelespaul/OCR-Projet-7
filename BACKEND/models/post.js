const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
	userId: { type: String, required: true },
	name: { type: String, required: true },
	title: { type: String, required: true },
	content: { type: String, required: true },
	imageUrl: { type: String, required: true },
	likes: { type: Number, default: 0, required: true },
	usersLiked: { type: Array, default: 0, required: true },
});

module.exports = mongoose.model("Post", postSchema);
