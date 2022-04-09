import { gql } from '@apollo/client';

export const PRODUCTS = gql`
    query products {
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
`;
export const PRODUCT = gql`
    query product($productId: ID!) {
        product(id: $productId) {
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
export const USER = gql`
    query user {
        user {
            _id
            firstName
            lastName
            fullName
            username
            email
            orders {
                _id
                purchaseDate
                products {
                    _id
                    name
                    description
                    image
                    price
                    quantity
                    inStock
                }
            }
        }
    }
`;
export const USERS = gql`
    query users {      
        users {
            _id
            firstName
            fullName
            lastName
            username
            email
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
`;
export const ORDER = gql`
    query order($id: ID!) {
        order(_id: $id) {
            _id
            purchaseDate
            products {
                _id
                name
                description
                image
                price
                quantity
                inStock
            }
        }
    }
`;
export const CHECKOUT = gql`
    query checkout($products: [ID]!) {
        checkout(products: $products) {
            session
        }
    }
`;
