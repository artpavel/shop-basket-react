import { createContext, useReducer } from 'react';
import { reducer } from './reducer';

export const ShopContext = createContext();

const initialState = {
  goods: [],
  loading: true,
  order: [],
  isBasketShow: false,
};

export const ContextProvider = ({ children }) => {
  const [value, dispatch] = useReducer(reducer, initialState);

  value.addToBasket = item => {
    dispatch({ type: 'ADD_TO_BASKET', payload: item });
  };

  value.incQuantity = itemId => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: { id: itemId } });
  };

  value.decQuantity = itemId => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: { id: itemId } });
  };

  value.removeFromBasket = itemId => {
    dispatch({ type: 'REMOVE_FROM_BASKET', payload: { id: itemId } });
  };

  value.onBasketShow = () => {
    dispatch({ type: 'TOGGLE_BASKET' });
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
