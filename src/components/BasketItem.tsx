import React from 'react';
import { IProductInBasket } from '../interfaces/product';

interface BasketItemProps {
  item: IProductInBasket;
  selected: boolean;
  onClick: () => void;
}

const BasketItem: React.FC<BasketItemProps> = ({ item, selected, onClick }) => {
  return (
    <li className={`list-item ${selected ? 'selected' : ''}`} onClick={onClick}>
      <p className="text">{item.product.title}</p> <p className="text">Count: {item.count}</p>
    </li>
  );
};

export default BasketItem;
