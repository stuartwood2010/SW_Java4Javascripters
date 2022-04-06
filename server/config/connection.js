const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/j4jdb', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports = mongoose.connection;

