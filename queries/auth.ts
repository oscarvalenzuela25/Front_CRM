import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
  mutation AuthUser($loginData: AuthInput) {
    authUser(input: $loginData) {
      token
    }
  }
`;

export const NEW_USER_QUERY = gql`
  mutation registerNewUser($userData: UserInput) {
    newUser(input: $userData) {
      _id
      name
      lastname
      email
      createdAt
    }
  }
`;
