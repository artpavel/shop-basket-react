import React from 'react';

const Cart = props => {
  const { quantity = 0, onBasketShow } = props;
  return (
    <div className='cart blue darken-4 white-text' onClick={onBasketShow}>
      <i className='material-icons'>shopping_cart</i>
      <span className='cart-quantity'>{quantity}</span>
    </div>
  );
};

export default Cart;
