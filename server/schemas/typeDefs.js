const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    firstName: String
    lastName: String
    email: String
    profilePicture: String
    orders: [Order]
    savedPhotos: [Photo]
    likedPhotos: [Photo]
  }

  type Size {
    _id: ID!
    size: String!
    currentPrice: Float!
  }

  type Photo {
    _id: ID
    url: String
    title: String
    description: String
    createdBy: User
    createdAt: String
    likes: Int
    comments: [Comment]
    sizes: [Size]
  }

  type Order {
    _id: ID
    orderNumber: Int
    purchaseDate: String
    products: [Product]
    total: Float
  }

  type Product {
    _id: ID
    photo: Photo
    size: String
    quantity: Int
    price: Float
  }

  type Comment {
    _id: ID
    text: String
    createdAt: String
    createdBy: User
    photo: Photo
  }

  type Checkout {
    id: ID!
    status: String
  }

  type Auth {
    token: ID
    user: User
  }

  input ProductInput {
    _id: ID!
    quantity: Int!
    price: Float!
  }

  type Session {
    id: ID!
  }

  type Query {
    checkout(products: [ID]!): Checkout
    users: [User]
    user(_id: ID!): User
    photos: [Photo]
    photo(_id: ID!): Photo
    orders: [Order]
    order(_id: ID!): Order
    products: [Product]
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
