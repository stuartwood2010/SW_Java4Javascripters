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
        orders: [Order]
    }

    type Drink {
        _id: ID
        name: String
        image: String
    }

    type Product {
        _id: ID
        name: String
        description: String
        price: Float
        image: String
        quantity: Int
        inStock: Boolean
    }

    type Order {
        _id: ID
        purchaseDate: String
        products: [Product]
    }

    type Checkout {
        session: ID
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        drinks: [Drink]
        products: [Product]
        product(id: ID!): Product
        user: User
        users: [User]
        order(_id: ID!): Order
        checkout(products: [ID]!): Checkout
    }

    type Mutation {
        createUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        updateUser(firstName: String, lastName: String, email: String, password: String): User
        addOrder(products: [ID]!): Order
        updateProduct(_id: ID!, quantity: Int!): Product
    }
`;

module.exports = typeDefs;
