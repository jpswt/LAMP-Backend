let jwt = require('jsonwebtoken');
let argon2 = require('argon2');
let modelUsers = require('../models/users');

// function that registers a volunteer
const registerVolunteer = async (req, res) => {
	console.log('register volunteer');
	let input = req.body;
	let password = input.password;
	let pwHash = await argon2.hash(password);

	let data = {
		name: input.name,
		username: input.username,
		email: input.email,
		pw_hash: pwHash,
		isOrg: input.isOrg,
	};

	try {
		let results = await modelUsers.register(data);
		res.sendStatus(204);
	} catch (err) {
		console.log('Could not register the volunteer', err);
		res.sendStatus(500);
	}
};

//function that registers an organization
const registerOrganization = async (req, res) => {
	console.log('register organization');
	let input = req.body;
	let password = input.password;
	let pwHash = await argon2.hash(password);

	let data = {
		name: input.name,
		username: input.username,
		email: input.email,
		pw_hash: pwHash,
		isOrg: input.isOrg,
		address: input.address,
		phone: input.phone,
		website: input.website,
	};

	try {
		let results = await modelUsers.register(data);
		res.sendStatus(204);
	} catch (err) {
		console.log('Could not register the volunteer', err);
		res.sendStatus(500);
	}
};

// takes in email and username and return a JWT, which can be used in subsequent
// requests to prove the user in authenticated
const login = async (req, res) => {
	console.log('login');

	let email = req.body.email;
	let password = req.body.password;

	try {
		let results = await modelUsers.login(email);
		if (results.length === 1) {
			let hash = results[0].pw_hash;
			let userId = results[0].id;
			let userName = results[0].username;
			let isOrg = results[0].isOrg;

			let goodPassword = await argon2.verify(hash, password);

			let token = {
				email: email,
				user_id: userId,
				user_name: userName,
				isOrg: isOrg,
			};

			if (goodPassword) {
				let signedToken = jwt.sign(token, process.env.JWT_SECRET);
				res.cookie('Bearer', signedToken, { maxAge: 900000 });
				res.header('Authorization', `Bearer ${signedToken}`).send({
					signedToken,
					email,
					userId,
					userName,
					isOrg,
				});
			} else {
				res.sendStatus(400);
			}
		} else if (results.length > 1) {
			console.log('Returned more that one row for', email);
			res.sendStatus(500);
			return;
		} else if (results.length == 0) {
			res.sendStatus(400);
			return;
		}
	} catch (err) {
		console.log('Could not get password hash', err);
	}
};
//function to get a list of all users
let getAllUsers = async (req, res) => {
	console.log('Get all user information');
	try {
		let results = await modelUsers.getAllUsers();
		res.json(results);
	} catch (err) {
		console.log('Could not get execute query for user', err);
		res.sendStatus(400);
	}
};
//function to get a user by id
let getUser = async (req, res) => {
	console.log('Get single user information by id');
	let token = req.user_token;
	let userId = token.user_id;
	try {
		let results = await modelUsers.getUser(userId);
		res.json(results);
	} catch (err) {
		console.log('Could not get execute query for user', err);
		res.sendStatus(400);
	}
};
// function to get a list of all volunteers
let volunteersList = async (req, res) => {
	console.log('All volunteers information');
	let isOrg = 0;
	try {
		let results = await modelUsers.volunteersList(isOrg);
		res.json(results);
	} catch (err) {
		console.log('Could execute the query', err);
		res.sendStatus(400);
	}
};
//function to get a list of all organizations
let organizationsList = async (req, res) => {
	console.log('All organizations information');
	let isOrg = 1;
	try {
		let results = await modelUsers.organizationsList(isOrg);
		res.json(results);
	} catch (err) {
		console.log('Could execute the query', err);
		res.sendStatus(400);
	}
};

module.exports = {
	registerVolunteer,
	registerOrganization,
	login,
	getAllUsers,
	getUser,
	volunteersList,
	organizationsList,
};
