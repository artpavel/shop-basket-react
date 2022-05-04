import React, { useContext } from 'react';
import { ShopContext } from '../reducer/context';

const Cart = props => {
  const { quantity = 0 } = props;
  const { onBasketShow } = useContext(ShopContext);
  return (
    <div className='cart blue darken-4 white-text' onClick={onBasketShow}>
      <i className='material-icons'>shopping_cart</i>
      <span className='cart-quantity'>{quantity}</span>
    </div>
  );
};

export default Cart;
