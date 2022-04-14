const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const path = require('path');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./utils');
const {resolvers, typeDefs,} = require('./schemas');
const db = require('./config/connection');


const server = new ApolloServer({
	resolvers,
	typeDefs,
	context: authMiddleware
});

const PORT = process.env.PORT || 3001;
const app = express();

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
	  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.once('open', async () => {
	await server.start();
	// creates a /graphql endpoint for our server
	server.applyMiddleware({ app });
	app.listen(PORT, () => console.log('Server running on PORT 3001'));
});


