const {
	AuthorizationError,
	AuthenticationError
} = require('apollo-server-express');
const {
	Drink,
	Order,
	Product,
	User
} = require('../models');
const utils = require('../utils');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
	Query: {
		drinks: async () => {
			return await Drink.find()
		},
		user: async (parent, args, context) => {
			if (context.user) {
				const user = await User.findById(context.user.firstName._id)

				user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

				return user;
			}
		},
		users: async (_root, _args, context) => {
			if (!context.req.user) {
				throw new AuthorizationError('You must be logged in to do that');
			}
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
		orders: async () => {
			return await Order.find({});
		},
		order: async (parent, {
			_id
		}, context) => {
			console.log(_id)
			const order = await Order.findById(_id)
			return order;
		},
		checkout: async (parent,  args , context) => {
			const url = new URL(context.headers.referer).origin;
			const order = await Order.create({
				products: args.products
			});			
			const line_items = [];
			const { products } = await order.populate('products');
			for (let i = 0; i < products.length; i++) {
				console.log('forloop hit');
				const product = await stripe.products.create({
					name: products[i].name,
					description: products[i].description,
					// Image not rendering
					// images:	[`${url}/images/${products[i].image}`]
				});
				console.log(product)
				const price = await stripe.prices.create({
					product: product.id,
					unit_amount: order.products[i].price * 100,
					currency: 'usd',
				});

				line_items.push({
					price: price.id,
					quantity: 1
				});
			}
			console.log('init sessions');
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				line_items,
				mode: 'payment',
				// CREATE A FRONT END TO INTERACT WITH BELOW!!!!!!
				success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${url}/`
			});
			console.log('session complete');
			// console.log(session);
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
				throw new AuthenticationError('No user found with these credentials');
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('No user found with these credentials');
			}

			const token = utils.signToken(user);

			return {
				token,
				user
			};


		},
		updateUser: async (parent, args, context) => {
			if (context.user) {
				return await User.findByIdAndUpdate(context.user._id, args, {
					new: true
				});
			}

			throw new AuthenticationError('Not logged in');
		},
		addOrder: async (parent, {products}, context) => {
			console.log(products);
			if (context.user) {
				try {
					let order = await Order.create({
						products
					});
					order = await order.populate("products");
					console.log(order);
					await User.findByIdAndUpdate(context.user._id, {
						$push: {
							orders: order
						}
					}, {
						new: true
					});
					return order;
				} catch (e) {
					throw new Error(e.message);
				}

			}

			throw new AuthenticationError('Not logged in');
		},
		updateProduct: async (parent, {
			_id,
			quantity
		}) => {
			const decrement = Math.abs(quantity) * -1;

			return await Product.findByIdAndUpdate(_id, {
				$inc: {
					quantity: decrement
				}
			}, {
				new: true
			});
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