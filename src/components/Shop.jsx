import React, { useState, useEffect, useContext } from 'react';
import { API_KEY, API_URL } from '../config';
import GoodsList from './GoodsList';
import Preloader from './Preloader';
import Cart from './Cart';
import BasketList from './BasketList';
import { ShopContext } from '../reducer/context';

const Shop = () => {
  const { loading, order, isBasketShow, setGoods } = useContext(ShopContext);

  useEffect(function getGoods() {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then(res => res.json())
      .then(data => {
        setGoods(data.featured);
      });
  }, []);

  return (
    <main className='container content'>
      <Cart quantity={order.length} />
      {loading ? <Preloader /> : <GoodsList />}
      {isBasketShow && <BasketList />}
    </main>
  );
};

export default Shop;
