import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ProductInput]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        photo {
          _id
          title
          description
          price
          name
          createdBy {
            _id
            username
          }
        }
        size
        quantity
      }
      total
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $username: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      username: $username
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPLOAD_PHOTO = gql`
  mutation uploadPhoto(
    $uploadURL: Blob!
    $description: String!
    $photoName: String!
  ) {
    uploadPhoto(
      uploadURL: $uploadURL
      description: $description
      photoName: $photoName
    )
  }
`;
