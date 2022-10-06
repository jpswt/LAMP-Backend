const db = require('../database/connection');

let promisify = (sql, params) => {
	return new Promise((resolve, reject) => {
		db.query(sql, params, (err, results) => {
			if (!err) {
				resolve(results);
			} else {
				reject(err);
			}
		});
	});
};

module.exports = { promisify };
