import { gql } from '@apollo/client';

export const QUERY_PHOTOS = gql`
  query getPhotos {
    photos {
      _id
      url
      title
      description
      createdBy {
        _id
        username
      }
      likes
      comments {
        _id
        text
        createdBy {
          _id
          username
        }
      }
    }
  }
`;

export const QUERY_ORDERS = gql`
  query getOrders {
    orders {
      _id
      purchaseDate
      products {
        photo {
          _id
          url
        }
        size
        price # Include the price field here to get the price of each product in the order
        quantity
      }
      total
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      id
      status
    }
  }
`;

export const QUERY_ALL_PHOTOS = gql`
  {
    photos {
      _id
      url
      title
      description
      createdBy {
        username
      }
      createdAt
      likes
      comments {
        _id
        text
        createdAt
        createdBy {
          _id
          username
        }
      }
    }
  }
`;

export const QUERY_SINGLE_PHOTO = gql`
  query getSinglePhoto($id: ID!) {
    photo(_id: $id) {
      _id
      comments {
        _id
        text
        createdAt
        createdBy {
          username
          profilePicture
        }
      }
      createdAt
      createdBy {
        username
        profilePicture
      }
      description
      likes
      title
      url
      sizes {
        _id
        size
        currentPrice
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      firstName
      lastName
      email
      profilePicture
      orders {
        _id
        purchaseDate
        products {
          photo {
            _id
            url
            title
          }
          size
          quantity
          price
        }
        total
      }
      savedPhotos {
        _id
        url
        title
        description
        createdBy {
          username
        }
        likes
      }
      likedPhotos {
        _id
        url
        title
        description
        createdBy {
          username
        }
        likes
      }
    }
  }
`;

export const QUERY_USER_ORDERS = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      firstName
      lastName
      email
      profilePicture
      orders {
        _id
        purchaseDate
        products {
          photo {
            _id
            url
            title
          }
          size
          quantity
          price
        }
        total
      }
      savedPhotos {
        _id
        url
        title
        description
        createdBy {
          username
        }
        likes
      }
      likedPhotos {
        _id
        url
        title
        description
        createdBy {
          username
        }
        likes
      }
    }
  }
`;
