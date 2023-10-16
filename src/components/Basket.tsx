import { FC, memo } from 'react';
import BasketItem from './BasketItem';
import { IProductInBasket } from '../interfaces/product';

interface IProps {
  selectedItemBasket: IProductInBasket[];
  onDeleteSelectedFromBasket: () => void;
  onToggleSelectBasket: (item: IProductInBasket) => void;
  basket: IProductInBasket[];
  calculateTotal: number;
}

const Basket: FC<IProps> = memo(({ selectedItemBasket, onDeleteSelectedFromBasket, onToggleSelectBasket, basket, calculateTotal }) => {
  console.log('BASKET');

  return (
    <div className="basket">
      <h2 className="title">Basket</h2>
      <div className="wrapper">
        <button
          disabled={selectedItemBasket.length === 0}
          className={`btn ${selectedItemBasket.length === 0 ? 'disabled' : ''}`}
          onClick={onDeleteSelectedFromBasket}
        >
          Delete
        </button>
      </div>
      <ul className="list">
        {basket.map((item) => (
          <BasketItem key={item.product.id} item={item} selectedItemBasket={selectedItemBasket} onToggleSelectBasket={onToggleSelectBasket} />
        ))}
      </ul>
      <p className="text total">Total: {calculateTotal}</p>
    </div>
  );
});

export default Basket;
