import { useState, useEffect, ChangeEvent } from 'react';
import { useProducts } from './api';
import { IProduct, IProductInBasket } from './interfaces/product';
import Container from './components/Container';
import InventoryItem from './components/InventoryItem';
import BasketItem from './components/BasketItem';

function App() {
  const { data, isLoading, isError } = useProducts();
  const [inventory, setInventory] = useState<IProduct[]>([]);
  const [basket, setBasket] = useState<IProductInBasket[]>([]);
  const [title, setTitle] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<IProduct[]>([]);
  const [selectedItemBasket, setSelectedItemBasket] = useState<IProductInBasket[]>([]);

  useEffect(() => {
    if (data) {
      setInventory(data);
    }
  }, [data]);

  const handleAddSelectedToBasket = () => {
    selectedItems.forEach((item) => {
      const existingProductIndex = basket.findIndex((basketItem) => basketItem.product.id === item.id);

      if (existingProductIndex !== -1) {
        const updatedBasket = [...basket];
        updatedBasket[existingProductIndex].count += 1;
        setBasket(updatedBasket);
      } else {
        const product = { count: 1, product: item };
        setBasket((prev) => [...prev, product]);
      }
    });

    setSelectedItems([]);
  };

  const handleToggleSelect = (item: IProduct) => {
    const isSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleToggleSelectBasket = (item: IProductInBasket) => {
    const isSelected = selectedItemBasket.some((selectedItem) => selectedItem.product.id === item.product.id);
    if (isSelected) {
      setSelectedItemBasket(selectedItemBasket.filter((selectedItem) => selectedItem.product.id !== item.product.id));
    } else {
      setSelectedItemBasket([...selectedItemBasket, item]);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleAddToInventory = () => {
    const newProduct = { id: inventory.length + 1, title };
    setInventory([...inventory, newProduct]);
    setTitle('');
  };

  const handleDeleteSelectedFromBasket = () => {
    const updatedBasket = basket.filter((item) => !selectedItemBasket.some((selectedItem) => selectedItem.product.id === item.product.id));
    setBasket(updatedBasket);
    setSelectedItemBasket([]);
  };

  const calculateTotal = () => basket.reduce((acc, item) => acc + item.count, 0);

  if (isLoading) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="center">
        <p>Error fetching data.</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Container>
        <div className="inventory">
          <h2 className="title">Inventory</h2>
          <div className="wrapper">
            <label className="text" htmlFor="title">
              Title:
            </label>
            <input className="input" id="title" value={title} onChange={(e) => handleTitleChange(e)} />
            <button disabled={title.length < 3} className={`btn ${title.length < 3 ? 'disabled' : ''}`} onClick={handleAddToInventory}>
              New
            </button>
            <button disabled={selectedItems.length === 0} className={`btn ${selectedItems.length === 0 ? 'disabled' : ''}`} onClick={handleAddSelectedToBasket}>
              Add
            </button>
          </div>
          <ul className="list">
            {inventory.map((item: IProduct) => (
              <InventoryItem
                key={item.id}
                item={item}
                selected={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
                onClick={() => handleToggleSelect(item)}
              />
            ))}
          </ul>
        </div>
        <div className="basket ">
          <h2 className="title">Basket</h2>
          <div className="wrapper">
            <button
              disabled={selectedItemBasket.length === 0}
              className={`btn ${selectedItemBasket.length === 0 ? 'disabled' : ''}`}
              onClick={handleDeleteSelectedFromBasket}
            >
              Delete
            </button>
          </div>
          <ul className="list">
            {basket.map((item: IProductInBasket) => (
              <BasketItem
                key={item.product.id}
                item={item}
                selected={selectedItemBasket.some((selectedItem) => selectedItem.product.id === item.product.id)}
                onClick={() => handleToggleSelectBasket(item)}
              />
            ))}
          </ul>
          <p className="text total">Total: {calculateTotal()}</p>
        </div>
      </Container>
    </div>
  );
}

export default App;
