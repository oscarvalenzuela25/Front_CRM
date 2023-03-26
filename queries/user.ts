import { gql } from '@apollo/client';

export const GET_USER = gql`
  query {
    getUser {
      _id
      name
      lastname
      email
      createdAt
    }
  }
`;

export const GET_BEST_SELLER = gql`
  query {
    getBestSellers {
      total
      seller {
        _id
        name
        lastname
        email
        createdAt
      }
    }
  }
`;
