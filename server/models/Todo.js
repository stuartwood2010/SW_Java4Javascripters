const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
	task: String,
	completed: {
		type: Boolean,
		default: false,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

module.exports = model('Todo', todoSchema);
