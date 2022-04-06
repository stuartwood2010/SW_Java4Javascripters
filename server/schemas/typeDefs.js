/* typeDefs is short for typeDefinitions */
const { gql } = require('apollo-server-express');

// Queries and Mutations
const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        fullName: String
        username: String
        email: String
        cart: [Cart]
    }

    type Product {
        _id: ID
        name: String
        price: Int
        image: String
        quantity: Int
        inStock: Boolean
    }

    type Cart {
        userId: User
        products: [Product]
        amount: Int
    }

    type Auth {
        token: String
        user: User
    }

    type Query {
        user(id: String!): User
        users: [User]
        product(id: String!): Product
        products: [Product]
        cart(id: String!): Cart
    }

    type Mutation {
        createUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addProductToCart(id: String!): Auth
        removeProductFromCart(id: String!): Cart
    }
`;

module.exports = typeDefs;
