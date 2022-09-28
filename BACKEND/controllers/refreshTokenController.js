const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const handleRefreshToken = async (req, res) => {
	console.log("handleRefreshToken");
	//getting the cookies
	const cookies = req.cookies;
	//if the refresh token is not found in the cookies
	if (!cookies.refreshToken) {
		return res.status(401);
	}
	console.log("cookies.refreshToken", cookies.refreshToken);
	//verifying the refresh token
	const refreshToken = cookies.refreshToken;
	const foundUser = await User.findOne({ refreshToken: refreshToken });
	//if the refresh token is not found in the database
	if (!foundUser) {
		return res.status(403);
	}
	//if the refresh token is found in the database
	//verifying the refresh token
	const decodedToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
	//if the refresh token is not valid
	if (!decodedToken) {
		return res.status(403);
	}
	const userId = decodedToken.userId;
	//creating a new access token
	const newAccessToken = jwt.sign({ userId: userId }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "5min" });
	//sending the new access token to the client
	res.status(200);
	res.json({
		userId: userId,
		token: newAccessToken,
	});
};

module.exports = {
	handleRefreshToken,
};
