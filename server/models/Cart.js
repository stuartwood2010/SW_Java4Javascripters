const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
	userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            id:{
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: Number
        }
    ],
    amount: {
        type: Number,
        required: true,
    }
    
});

module.exports = model('Cart', cartSchema);