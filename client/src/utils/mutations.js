import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login ($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
      username
      firstName
      lastName
      fullName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          image
          quantity
          inStock
        }
      }
    }
  }
}   
`;
export const CREATE_USER = gql`
    mutation createUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
        createUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password) {
            token
            user {
            _id
            firstName
            lastName
            fullName
            username
            email
            }
        }   
    }
}
`;

export const UPDATE_USER = gql`
    mutation updateUser($firstName: String, $lastName: String, $email: String, $password: String) {
        updateUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
            _id
            firstName
            lastName
            fullName
            username
            email
        }
    }
`;

export const ADD_ORDER = gql`
    mutation addOrder ($products: [ID]!) {
        addOrder(products: $products) {
            _id
            purchaseDate
            products {
                _id
                name
                description
                price
                image
                quantity
                inStock
            }   
        }
    }
`;

export const UPDATE_PRODUCT = gql`
    mutation updateProduct($id: ID!, $quantity: Int!) {
        updateProduct(_id: $id, quantity: $quantity) {
            _id
            name
            description
            price
            image
            quantity
            inStock
        }
    }
`;
