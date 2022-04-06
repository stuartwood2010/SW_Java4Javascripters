const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/J4JDB', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports = mongoose.connection;

