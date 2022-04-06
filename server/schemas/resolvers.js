const {AuthorizationError} = require('apollo-server-express');
const { argsToArgsConfig } = require('graphql/type/definition');
const {Cart, Product, User} = require('../models');
const utils = require('../utils');

const resolvers = {
	Query: {
		user: async (_root, {id}) => {
			return await User.findById(id);
		},
		users: async (_root, _args, context) => {
			if (!context.req.user) {
				throw new AuthorizationError('You must be logged in to do that');
			}
			return await User.find({});
		},
		product: async (_root, {id}) => {
			return await Product.findById(id);
		},
		products: async () => {
			return await Product.find({});
		}
	},
	Mutation: {
		// Sign up
		createUser: async (_root, {firstName, lastName, username, email, password}) => {
			const user = await User.create({
				firstName,
				lastName,
				username,
				email,
				password,
			});
			const token = utils.signToken(user.username, user._id);
			return {token, user};
		},
		login: async (_root, {email, password}) => {
			const user = await User.findOne({email});

			if (!user) {
				throw new AuthorizationError('No user found with these credentials');
			}

			// successfully logged in
			if (user.password === password) {
				const token = utils.signToken(user.username, user._id);
				return {token, user};
			}

			throw new AuthorizationError('No user found with these credentials');

		},
		addProductToCart: async (parent, {input}, context) => {
			if (context.user) {
				const cartHolder = await User.findByIdAndUpdate(
					{_id: context.user._id},
					{$addToSet: {cart: input}},
					{new: true}
				)
				return cartHolder
			}
		},
		removeProductFromCart: async (parent, {input}, context) => {
			if  (context.user) {
				const cartHolder = await User.findByIdAndUpdate(
					{_id: context.user._id},
					{$pull: {savedBooks: {bookId: argsToArgsConfig.bookId}}},
					{new: true}
				);
				return cartHolder;
			}
		}
	},
	// Field Resolvers
	// Basically things we defined in typeDefs
	// that isn't in the database
	// but we want extra shit, we can use field resolvers
	User: {
		fullName: (root) => {
			console.log('I AM ROOT',root);
			return `${root.firstName} ${root.lastName}`;
		},
		cart: async  (root) => {
			return await Cart.find({
				userId: root._id,
			});
		}
	},
	Cart: {
		userId: async (root) => {
			return await User.findById(root.userId);
		},
		products: async (root) => {
			return await Product.find({
				cartId: root._id
			})
		}
	}
};

module.exports = resolvers;
