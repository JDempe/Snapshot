const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Size {
    name: String
    price: Float
  }

  type Photo {
    _id: ID
    url: String
    title: String
    description: String
    createdBy: User
    sizes: [Size]
    likes: Int
    comments: [Comment]
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [OrderProduct]
    total: Float
  }

  type OrderProduct {
    photo: Photo
    size: String
    quantity: Int
  }

  type Comment {
    _id: ID
    text: String
    createdAt: String
    createdBy: User
    photo: Photo
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input ProductInput {
    _id: ID!
    quantity: Int!
  }

  type Session {
    id: ID!
  }

  type Query {
    checkout(products: [ProductInput]!): Session
    users: [User]
    user(username: String!): User
    photos: [Photo]
    photo(_id: ID!): Photo
    orders: [Order]
    order(_id: ID!): Order
    comments: [Comment]
    comment(_id: ID!): Comment
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      firstName: String!
      lastName: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addPhoto(url: String!, title: String!, description: String!): Photo

    addOrder(products: [ProductInput]!): Order
    updateUser(
      username: String
      email: String
      password: String
      firstName: String
      lastName: String
    ): User
    uploadPhoto(
      uploadURL: String!
      description: String
      photoName: String
    ): Photo
    addComment(photoId: ID!, content: String!): Comment
    addLike(photoId: ID!): Photo
    removeLike(photoId: ID!): Photo
    deletePhoto(photoId: ID!): Photo
    updatePhoto(photoId: ID!, title: String, description: String): Photo
    updateComment(commentId: ID!, content: String!): Comment
  }
`;

module.exports = typeDefs;
