const { AuthorizationError } = require('apollo-server-express');
const { Order, Product, User } = require('../models');
const utils = require('../utils');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
	Query: {
		user: async (_root, {
			id
		}) => {
			return await User.findById(id);
		},
		users: async (_root, _args, context) => {
			// if (!context.req.user) {
			// 	throw new AuthorizationError('You must be logged in to do that');
			// }
			return await User.find({});
		},
		product: async (_root, {
			id
		}) => {
			return await Product.findById(id);
		},
		products: async () => {
			return await Product.find({});
		},
		order: async (parent, {
			_id
		}, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id).populate({
					path: 'orders.products',
				});
				return user.orders.id(_id);
			}
			throw new AuthorizationError('Not logged in');
		},
		checkout: async (parent, args, context) => {
			// const url = new URL(context.headers.referer).origin;
			const order = await Order.create({
				products: args.products
			});
			await User.findByIdAndUpdate(
				{ _id: context.user._id },
				{ $push: { orders: order} },
				{ new: true }
			  );
			const line_items = [];

			const {
				products
			} = await order.populate('products');

			for (let i = 0; i < products.length; i++) {
				const product = await stripe.products.create({
					name: products[i].name,
					description: products[i].description,
					// images: [`${url}/images/${products[i].image}`]
				});

				const price = await stripe.prices.create({
					product: product.id,
					unit_amount: products[i].price * 100,
					currency: 'usd',
				});

				line_items.push({
					price: price.id,
					quantity: 1
				});
			}
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				line_items,
				mode: 'payment',
				// CREATE A FRONT END TO INTERACT WITH BELOW!!!!!!
				// success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
				// cancel_url: `${url}/`
			});
			return {
				session: session.id
			};
		}
	},
	Mutation: {
		// Sign up
		createUser: async (_root, {
			firstName,
			lastName,
			username,
			email,
			password
		}) => {
			const user = await User.create({
				firstName,
				lastName,
				username,
				email,
				password,
			});
			const token = utils.signToken(user.username, user._id);
			return {
				token,
				user
			};
		},
		login: async (_root, {
			email,
			password
		}) => {
			const user = await User.findOne({
				email
			});

			if (!user) {
				throw new AuthorizationError('No user found with these credentials');
			}

			// successfully logged in
			if (user.password === password) {
				const token = utils.signToken(user.username, user._id);
				return {
					token,
					user
				};
			}

			throw new AuthorizationError('No user found with these credentials');

		},
	  updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
		addOrder: async (parent, { products }, context) => {

      if (context.user) {
				try {
					let order = await Order.create({ products });
					order = await order.populate("products");
					console.log(order);
					await User.findByIdAndUpdate(context.user._id, { $push: { orders: order }}, { new: true });
				return order;
				} catch (e) {
					throw new Error(e.message);
				}
        
      }

      throw new AuthenticationError('Not logged in');
    },
		updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
	},

	User: {
		fullName: (root) => {
			console.log('I AM ROOT', root);
			return `${root.firstName} ${root.lastName}`;
		},
		orders: async (root) => {
			return await Order.find({
				userId: root._id,
			});
		}
	},
};

module.exports = resolvers;