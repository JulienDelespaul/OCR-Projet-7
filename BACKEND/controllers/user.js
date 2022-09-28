const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = (req, res, next) => {
	bcryptjs
		//hashing and salting the password
		.hash(req.body.password, 10)
		.then((hash) => {
			//creating a new user
			const user = new User({
				email: req.body.email,
				password: hash,
				role: req.body.role,
			});
			//saving the user to the database
			user
				.save()
				.then(() => res.status(201).json({ message: "Utilisateur créé !" }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
	//finding the user in the database
	User.findOne({ email: req.body.email })
		.then((user) => {
			//if the user is not found
			if (!user) {
				return res.status(401).json({ error: "Utilisateur non trouvé !" });
			}
			bcryptjs
				//comparing the password
				.compare(req.body.password, user.password)
				.then((valid) => {
					//if the password is not valid
					if (!valid) {
						return res.status(401).json({ error: "Mot de passe incorrect !" });
					}
					//if the password is valid
					//creating a refresh token
					const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: "1d" });
					//updating the refresh token in the database
					user.refreshToken = refreshToken;
					user.save();
					// sending the refresh token to the client
					res.status(200);
					res.cookie("refreshToken", refreshToken, {
						httpOnly: true,
						secure: true,
						sameSite: "none",
						maxAge: 24 * 60 * 60 * 1000,
					});
					//creating and sending an access token
					res.json({
						userId: user._id,
						token: jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "15min" }),
						role: user.role,
					});
					console.log("refreshToken", refreshToken);
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};
