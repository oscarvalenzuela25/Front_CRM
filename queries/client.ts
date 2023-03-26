import { gql } from '@apollo/client';

export const GET_CLIENTS_BY_SELLER = gql`
  query {
    getClientsBySeller {
      _id
      name
      lastname
      business
      email
      phone
      createdAt
      seller
    }
  }
`;

export const DELETE_CLIENTE = gql`
  mutation deleteClient($clientId: ID) {
    deleteClient(clientId: $clientId)
  }
`;

export const GET_BEST_CLIENTS = gql`
  query {
    getBestClients {
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
    }
  }
`;

export const ADD_CLIENT = gql`
  mutation NewClient($clientData: ClientInput) {
    newClient(input: $clientData) {
      _id
      name
      lastname
      business
      email
      phone
      createdAt
      seller
    }
  }
`;

export const GET_CLIENT_BY_ID = gql`
  query getClient($clientId: ID) {
    getClient(clientId: $clientId) {
      _id
      name
      lastname
      business
      email
      phone
      createdAt
      seller
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation updateClient($clientId: ID, $input: ClientInput) {
    updateClient(clientId: $clientId, input: $input) {
      _id
      name
      lastname
      business
      email
      phone
      createdAt
      seller
    }
  }
`;
