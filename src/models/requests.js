const helper = require('../helper/promisify');

const sentVolRequests = (userName) => {
	let sql =
		'select users.name, org_id, start_date, start_time, time_span, message, created_on, accepted from request join users on request.org_id = users.id where vol_username = ? order by created_on desc';
	// 'select users.name, org_id, start_time, time_span, message, created_on, accepted from request join users on request.vol_username = users.username where vol_username = ? order by created_on desc';
	return helper.promisify(sql, userName);
};

const receivedOrgRequests = (userId) => {
	let sql =
		'select request.id, users.username, users.name, users.email, start_date, start_time, time_span, message, created_on, accepted from request join users on request.vol_username = users.username where org_id = ? order by created_on desc';
	return helper.promisify(sql, userId);
};

const sendRequest = (data, userName) => {
	let sql = 'insert into request set ?';
	let params = [data, userName];
	return helper.promisify(sql, params);
};

const acceptRequest = (accepted, id) => {
	let sql = 'update request set accepted = ? where id = ?';
	let params = [accepted, id];
	return helper.promisify(sql, params);
};

const declineRequest = (accepted, id) => {
	let sql = 'update request set accepted = ? where id = ?';
	let params = [accepted, id];
	return helper.promisify(sql, params);
};

const deleteRequest = (id) => {
	let sql = 'delete from request where id = ?';
	let params = [id];
	return helper.promisify(sql, params);
};

module.exports = {
	sentVolRequests,
	receivedOrgRequests,
	sendRequest,
	acceptRequest,
	declineRequest,
	deleteRequest,
};
