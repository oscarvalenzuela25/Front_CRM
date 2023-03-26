import { gql } from '@apollo/client';

export const GET_ORDERS_BY_SELLER = gql`
  query {
    getOrdersBySeller {
      _id
      products {
        id
        name
        price
        quantity
      }
      total
      client {
        _id
        name
        lastname
        business
        email
        phone
        createdAt
        seller
      }
      seller
      status
      createdAt
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($orderId: ID, $input: OrderInput) {
    updateOrder(orderId: $orderId, input: $input) {
      _id
      products {
        id
        name
        price
        quantity
      }
      total
      client {
        _id
        name
        lastname
        business
        email
        phone
        createdAt
        seller
      }
      seller
      status
      createdAt
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($orderId: ID) {
    deleteOrder(orderId: $orderId)
  }
`;

export const NEW_ORDER = gql`
  mutation NewOrder($orderData: OrderInput) {
    newOrder(input: $orderData) {
      _id
      products {
        id
        name
        price
        quantity
      }
      total
      client {
        _id
        name
        lastname
        business
        email
        phone
        createdAt
        seller
      }
      seller
      status
      createdAt
    }
  }
`;
