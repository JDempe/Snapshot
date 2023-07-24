import { gql } from '@apollo/client';

// export const QUERY_PHOTOS = gql`
//   query getProducts($category: ID) {
//     products(category: $category) {
//       _id
//       name
//       description
//       price
//       quantity
//       image
//       category {
//         _id
//       }
//     }
//   }
// `;
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
      likes
      #   comments {
      #     _id
      #     text
      #     createdAt
      #     createdBy {
      #       _id
      #       username
      #     }
      # }
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

// export const QUERY_USER = gql`
//   query GetUser($id: ID!) {
//     user(_id: $id) {
//       _id
//       username
//       email
//       firstName
//       lastName
//       # orders {
//       #   _id
//       #   purchaseDate
//       #   products {
//       #     _id
//       #     name
//       #     description
//       #     price
//       #     quantity
//       #     image
//       #   }
//       # }
//     }
//   }
// `;
// export const QUERY_USER = gql`
//   query getUser($id: ID!) {
//     user(_id: $id) {
//       _id
//       username
//       email
//       firstName
//       lastName
//       orders {
//         _id
//         purchaseDate
//         products {
//           photo {
//             _id
//             title
//           }
//           size
//           quantity
//         }
//       }
//     }
//   }
// `;

export const QUERY_USER = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      email
      firstName
      lastName
      profilePicture
      orders {
        total
        purchaseDate
        products {
          size
          quantity
          photo {
            url
            title
            likes
            description
            createdBy {
              username
            }
          }
        }
      }
    }
  }
`;
