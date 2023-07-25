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
      _id
      purchaseDate
      total
      products {
        _id
        quantity
        price
        photo {
          _id
          url
          title
        }
        size
      }
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

export const ADD_COMMENT = gql`
  mutation addComment($photoId: ID!, $commentText: String!) {
    addComment(photoId: $photoId, content: $commentText) {
      _id
      text
      createdAt
      createdBy {
        _id
        profilePicture
        username
      }
    }
  }
`;

export const UPLOAD_PHOTO = gql`
  mutation addPhoto($url: String!, $title: String!, $description: String!) {
    addPhoto(url: $url, title: $title, description: $description) {
      url
      title
      description
      createdBy {
        _id
      }
    }
  }
`;
