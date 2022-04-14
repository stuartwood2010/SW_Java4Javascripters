import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, } from 'react-router-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token || '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>     
      <App/>      
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.register();