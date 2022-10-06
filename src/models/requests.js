const helper = require('../helper/promisify');

const sentVolRequests = (userName) => {
	let sql =
		'select users1.name, org_id, start_date, start_time, time_span, message, created_on, accepted from request join users1 on request.org_id = users1.id where vol_username = ? order by created_on desc';
	// 'select users1.name, org_id, start_time, time_span, message, created_on, accepted from request join users1 on request.vol_username = users1.username where vol_username = ? order by created_on desc';
	return helper.promisify(sql, userName);
};

const receivedOrgRequests = (userId) => {
	let sql =
		'select request.id, users1.username, users1.name, users1.email, start_date, start_time, time_span, message, created_on, accepted from request join users1 on request.vol_username = users1.username where org_id = ? order by created_on desc';
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
