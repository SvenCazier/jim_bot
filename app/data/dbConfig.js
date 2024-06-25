const mongoose = require("mongoose");

class DbConfig {
	static connect(url) {
		return mongoose.connect(url);
	}

	static disconnect() {
		return mongoose.disconnect();
	}

	static getConnection() {
		return mongoose.connection;
	}
}

module.exports = DbConfig;
