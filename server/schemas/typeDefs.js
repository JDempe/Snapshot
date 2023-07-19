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

  type Query {
    users: [User]
    user(_id: ID!): User
    photos: [Photo]
    photo(_id: ID!): Photo
    orders: [Order]
    order(_id: ID!): Order
    comments: [Comment]
    comment(_id: ID!): Comment
  }
`;

module.exports = typeDefs;