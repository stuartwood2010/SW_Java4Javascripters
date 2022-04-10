const { Schema, model } = require('mongoose');

const drinkSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
		type: String,
		required: true,
	},
});

module.exports = model('Drink', drinkSchema);