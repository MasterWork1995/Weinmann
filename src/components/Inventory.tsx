import { ChangeEvent, FC, memo } from 'react';
import InventoryItem from './InventoryItem';
import { IProduct } from '../interfaces/product';

interface IProps {
  title: string;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddToInventory: () => void;
  selectedItems: IProduct[];
  onAddSelectedToBasket: () => void;
  onToggleSelect: (item: IProduct) => void;
  inventory: IProduct[];
}

const Inventory: FC<IProps> = memo(({ title, onTitleChange, onAddToInventory, selectedItems, onAddSelectedToBasket, onToggleSelect, inventory }) => {
  return (
    <div className="inventory">
      <h2 className="title">Inventory</h2>
      <div className="wrapper">
        <label className="text" htmlFor="title">
          Title:
        </label>
        <input className="input" id="title" value={title} onChange={onTitleChange} />
        <button disabled={title.length < 3} className={`btn ${title.length < 3 ? 'disabled' : ''}`} onClick={onAddToInventory}>
          New
        </button>
        <button disabled={selectedItems.length === 0} className={`btn ${selectedItems.length === 0 ? 'disabled' : ''}`} onClick={onAddSelectedToBasket}>
          Add
        </button>
      </div>
      <ul className="list">
        {inventory.map((item) => (
          <InventoryItem key={item.id} item={item} selectedItems={selectedItems} onToggleSelect={onToggleSelect} />
        ))}
      </ul>
    </div>
  );
});

export default Inventory;
