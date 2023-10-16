import { FC } from 'react';
import { IProduct } from '../interfaces/product';

interface IProps {
  item: IProduct;
  selectedItems: IProduct[];
  onToggleSelect: (item: IProduct) => void;
}

const InventoryItem: FC<IProps> = ({ item, selectedItems, onToggleSelect }) => (
  <li onClick={() => onToggleSelect(item)} className={`list-item ${selectedItems.some((selectedItem) => selectedItem.id === item.id) ? 'selected' : ''}`}>
    <p className="text">{item.title}</p>
  </li>
);

export default InventoryItem;
