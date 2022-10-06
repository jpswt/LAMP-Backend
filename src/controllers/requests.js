const modelRequests = require('../models/requests');

//function that will create a list send request by a each user based on their token id
let sentVolRequests = async (req, res) => {
	console.log('Get volunteer request');
	let token = req.user_token;
	let userName = token.user_name;
	try {
		let results = await modelRequests.sentVolRequests(userName);
		res.json(results);
	} catch (err) {
		console.log('Could not get execute query for volunteer request', err);
		res.sendStatus(400);
	}
};
// function that allows organizations to view list of requests sent by user with specific token id
let receivedOrgRequests = async (req, res) => {
	console.log('Get requests received by organization');
	let token = req.user_token;
	let userId = token.user_id;
	try {
		let results = await modelRequests.receivedOrgRequests(userId);
		res.json(results);
	} catch (err) {
		console.log(
			'Could not get execute query for requests received by organization',
			err
		);
		res.sendStatus(400);
	}
};

// function that creates the request information for the user by token id
let sendRequest = async (req, res) => {
	console.log('Send a request');
	let token = req.user_token;
	let userName = token.user_name;
	let input = req.body;
	let date = new Date();
	let data = {
		vol_username: userName,
		org_id: input.org_id,
		start_date: input.start_date,
		start_time: input.start_time,
		time_span: input.time_span,
		message: input.message,
		created_on: date,
	};
	try {
		let results = await modelRequests.sendRequest(data, userName);
		res.status(201).send('Successfully added a request');
	} catch (err) {
		console.log('Could not get execute query to send request', err);
		res.sendStatus(400);
	}
};

//function that accepts the request based on input from the req.body by id
let acceptRequest = async (req, res) => {
	console.log('Accept a volunteer request');
	let id = req.body.id;
	let accepted = 1;
	try {
		let results = await modelRequests.acceptRequest(accepted, id);
		if (results.affectedRows == 1) {
			res
				.status(200)
				.send(`Successfully accepted the volunteer request with id: ${id}`);
		} else {
			res.sendStatus(400);
		}
	} catch (err) {
		console.log('Could not get execute query to accept request', err);
		res.sendStatus(400);
	}
};

//function that declines the request based on input from the req.body by id
let declineRequest = async (req, res) => {
	console.log('Decline a volunteer request');
	let id = req.body.id;
	let accepted = 0;
	try {
		let results = await modelRequests.declineRequest(accepted, id);
		if (results.affectedRows == 1) {
			res
				.status(200)
				.send(`Successfully declined the volunteer request with id: ${id}`);
		} else {
			res.sendStatus(400);
		}
	} catch (err) {
		console.log('Could not get execute query to decline request', err);
		res.sendStatus(400);
	}
};

// function that will delete a request from both user and organization
let deleteRequest = async (req, res) => {
	console.log('Delete volunteer request');
	let id = req.body.id;
	let token = req.user_token;
	let userName = token.user_name;
	try {
		let results = await modelRequests.deleteRequest(id);
		res
			.status(200)
			.send(`Successfully deleted volunteer request with id: ${id}`);
	} catch (err) {
		console.log('Could not get execute query to decline request', err);
		res.sendStatus(400);
	}
};

module.exports = {
	sentVolRequests,
	receivedOrgRequests,
	sendRequest,
	acceptRequest,
	declineRequest,
	deleteRequest,
};
