const helper = require('../helper/promisify');

const register = async (data) => {
	let sql = 'insert into users set ?';
	return helper.promisify(sql, data);
};

const login = async (email) => {
	let sql = 'select id, username, pw_hash, isOrg from users where email = ?';
	let param = [email];
	return helper.promisify(sql, param);
};

const getAllUsers = async () => {
	let sql = 'select id, name, username, email, phone, address from users';
	return helper.promisify(sql);
};

const getUser = async (userId) => {
	let sql = 'select id, name, username, email, isOrg from users where id = ?';
	return helper.promisify(sql, userId);
};

const volunteersList = async (isOrg) => {
	let sql = 'select id, name, username, email from users where isOrg = ?';
	return helper.promisify(sql, isOrg);
};

const organizationsList = async (isOrg) => {
	let sql =
		'select id, name, username, email, address, phone, website from users where isOrg = ?';
	return helper.promisify(sql, isOrg);
};

module.exports = {
	register,
	login,
	getAllUsers,
	getUser,
	volunteersList,
	organizationsList,
};
