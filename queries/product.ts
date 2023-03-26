import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query {
    getProducts {
      _id
      name
      stock
      price
      createdAt
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($productId: ID) {
    getProduct(productId: $productId) {
      _id
      name
      stock
      price
      createdAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($productId: ID) {
    deleteProduct(productId: $productId)
  }
`;

export const ADD_NEW_PRODUCT = gql`
  mutation NewProduct($formData: ProductInput) {
    newProduct(input: $formData) {
      _id
      name
      stock
      price
      createdAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($productId: ID, $input: ProductInput) {
    updateProduct(productId: $productId, input: $input) {
      _id
      name
      stock
      price
      createdAt
    }
  }
`;
