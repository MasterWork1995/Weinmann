import { FC } from 'react';
import { IProductInBasket } from '../interfaces/product';

interface IProps {
  item: IProductInBasket;
  selectedItemBasket: IProductInBasket[];
  onToggleSelectBasket: (item: IProductInBasket) => void;
}

const BasketItem: FC<IProps> = ({ item, selectedItemBasket, onToggleSelectBasket }) => (
  <li
    className={`list-item ${selectedItemBasket.some((selectedItem) => selectedItem.product.id === item.product.id) ? 'selected' : ''}`}
    onClick={() => onToggleSelectBasket(item)}
  >
    <p className="text">{item.product.title}</p> <p className="text">Count: {item.count}</p>
  </li>
);

export default BasketItem;
