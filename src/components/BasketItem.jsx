import { useContext } from 'react';
import { ShopContext } from '../reducer/context';

const BasketItem = props => {
  const {
    id,
    name,
    price,
    quantity,
    removeFromBasket = Function.prototype,
    incQuantity = Function.prototype,
    decQuantity = Function.prototype,
  } = props;

  return (
    <li className='collection-item'>
      {name}{' '}
      <i
        className='material-icons basket-quantity'
        onClick={() => decQuantity(id)}
      >
        remove
      </i>{' '}
      {quantity}{' '}
      <i
        className='material-icons basket-quantity'
        onClick={() => incQuantity(id)}
      >
        add
      </i>{' '}
      = {price * quantity} ₴
      <span className='secondary-content' onClick={() => removeFromBasket(id)}>
        <i className='material-icons basket-delete'>close</i>
      </span>
    </li>
  );
};

export default BasketItem;
