const { Schema, model } = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		required: [true, 'First Name is required']
	},
	lastName: {
		type: String,
		trim: true,
		required: [true, 'Last Name is required']
	},
	username: {
		type: String,
		trim: true,
		minLength: 4,
		maxLength: 20,
		required: [true, 'Username is required and must be a minimum of 4 and maximum of 20 characters'],
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate: {
			validator: function (value) {
				return isEmail(value);
			},
			message: function (userObject) {
				return `${userObject.email} is not a valid email address`;
			},
		}
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	orders: [
		{
		type: Schema.Types.ObjectId,
		ref: 'Order',
	}
	]
});

userSchema.pre('save', async function(next) {
	if (this.isNew || this.isModified('password')) {
	  const saltRounds = 10;
	  this.password = await bcrypt.hash(this.password, saltRounds);
	}
  
	next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = model('User', userSchema);