const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, default: "user", required: true },
	refreshToken: { type: String, required: false },
	// Profile
	firstName: { type: String, required: false },
	lastName: { type: String, required: false },
	position: { type: String, required: false },
	department: { type: String, required: false },
	picture: { type: String, required: false },
	background: { type: String, required: false },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
