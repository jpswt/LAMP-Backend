const jwt = require('jsonwebtoken');

let verifyJWT = (req, res, next) => {
	// get token from header and verify that it is good
	let header = req.get('Authorization');
	let signedToken;
	if (header) {
		let parts = header.split(' ');
		signedToken = parts[1];
	}

	// if token is good, proceed to controller portion of route
	if (signedToken) {
		try {
			let token = jwt.verify(signedToken, process.env.JWT_SECRET);
			console.log('decoded token', token);
			req.user_token = token;
			next();
		} catch (err) {
			res.sendStatus(400);
		}
	} else {
		res.sendStatus(400);
	}
};
// verify that the user token for an org exists, if it does proceed to the controller portion of route
let verifyOrg = (req, res, next) => {
	if (req.user_token.isOrg) {
		next();
	} else {
		res.sendStatus(400);
	}
};
// verify that the user token for an admin exists, if it does proceed to the controller portion of route
let verifyAdmin = (req, res, next) => {
	if (req.user_token.isAdmin) {
		next();
	} else {
		res.sendStatus(400);
	}
};

module.exports = { verifyJWT, verifyOrg, verifyAdmin };
