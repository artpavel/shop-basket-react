import React, { useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../config';
import GoodsList from './GoodsList';
import Preloader from './Preloader';
import Cart from './Cart';
import BasketList from './BasketList';

const Shop = () => {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setIsBasketShow] = useState(false);

  useEffect(function getGoods() {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then(res => res.json())
      .then(data => {
        data.featured && setGoods(data.featured);
        setLoading(false);
      });
  }, []);

  /**
   If the item is not in the order, add it to the order.  If the item is in the order, increase the quantity of the item in the order.
   */
  const addToBasket = item => {
    const isOrderIndex = order.findIndex(orderItem => orderItem.id === item.id);

    if (isOrderIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === isOrderIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });

      setOrder(newOrder);
    }
  };

  /**
   * When the basket is clicked, the basket will show or hide.
   */
  const onBasketShow = () => {
    setIsBasketShow(!isBasketShow);
  };

  /**
   * Remove the item from the order array that has the same id as the itemId argument.
   */
  const removeFromBasket = itemId => {
    const newOrder = order.filter(el => el.id !== itemId);
    setOrder(newOrder);
  };

  /**
   * If the itemId matches the id of the element in the order array, then return a new object with the
   * same properties as the original element, but with the quantity property increased by 1. Otherwise,
   * return the original element.
   */
  const incQuantity = itemId => {
    const newOrder = order.map(el => {
      if (el.id === itemId) {
        const newQuantity = el.quantity + 1;
        return {
          ...el,
          quantity: newQuantity,
        };
      } else {
        return el;
      }
    });
    setOrder(newOrder);
  };

  /**
   * If the itemId matches the id of the current element, then return a new object with the same
   * properties as the current element, except for the quantity property, which should be the current
   * element's quantity minus one, unless that would result in a negative quantity, in which case the
   * quantity should be zero.
   */
  const decQuantity = itemId => {
    const newOrder = order.map(el => {
      if (el.id === itemId) {
        const newQuantity = el.quantity - 1;
        return {
          ...el,
          quantity: newQuantity >= 0 ? newQuantity : 0,
        };
      } else {
        return el;
      }
    });

    setOrder(newOrder);
  };

  return (
    <main className='container content'>
      <Cart quantity={order.length} onBasketShow={onBasketShow} />
      {loading ? (
        <Preloader />
      ) : (
        <GoodsList goods={goods} addToBasket={addToBasket} />
      )}
      {isBasketShow && (
        <BasketList
          onBasketShow={onBasketShow}
          order={order}
          removeFromBasket={removeFromBasket}
          incQuantity={incQuantity}
          decQuantity={decQuantity}
        />
      )}
    </main>
  );
};

export default Shop;
