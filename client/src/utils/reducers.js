import { useReducer } from 'react';
import {
  UPDATE_USER,
  UPDATE_CURRENT_PHOTO,
  UPDATE_PHOTOS,
  UPDATE_USER_PHOTOS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  CLEAR_CART,
  TOGGLE_CART,
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.user,
      };

    case UPDATE_CURRENT_PHOTO:
      return {
        ...state,
        currentPhoto: action.photo,
      };

    case UPDATE_PHOTOS:
      return {
        ...state,
        photos: [...action.photos],
      };

    case UPDATE_USER_PHOTOS:
      return {
        ...state,
        userPhotos: [...action.photos],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.photo],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...action.photos],
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if ([action._id, action.size] === [product._id, product.size]) {
            product.quantity = action.quantity;
          }
          return product;
        }),
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return [product._id, product.size] !== [action._id, action.size];
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
