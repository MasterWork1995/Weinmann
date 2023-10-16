import { FC } from 'react';
import { IProduct } from '../interfaces/product';

interface InventoryItemProps {
  item: IProduct;
  selected: boolean;
  onClick: () => void;
}

const InventoryItem: FC<InventoryItemProps> = ({ item, selected, onClick }) => {
  return (
    <li className={`list-item ${selected ? 'selected' : ''}`} onClick={onClick}>
      <p className="text">{item.title}</p>
    </li>
  );
};

export default InventoryItem;
