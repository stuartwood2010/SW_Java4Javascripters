/* typeDefs is short for typeDefinitions */
const { gql } = require('apollo-server-express');

// Queries and Mutations
const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        fullName: String
        nameLength: Int
        email: String
        todos: [Todo]
    }

    type Auth {
        token: String
        user: User
    }

    type Todo {
        _id: ID
        task: String
        completed: Boolean
        userId: String
        user: User
    }

    type Query {
        user(id: String!): User
        users: [User]
        todo(id: String!): Todo
        todos: [Todo]
    }

    type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createTodo(task: String!, userId: String!, completed: Boolean): Todo
    }
`;

module.exports = typeDefs;
