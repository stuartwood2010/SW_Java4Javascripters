const { Schema, model } = require('mongoose');

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	inStock: Boolean,
});

module.exports = model('Product', productSchema);