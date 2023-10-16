import { useState, useEffect, ChangeEvent, useCallback } from 'react';
import { useProducts } from './api';
import { IProduct, IProductInBasket } from './interfaces/product';
import Container from './components/Container';
import Inventory from './components/Inventory';
import Basket from './components/Basket';

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

  const handleAddSelectedToBasket = useCallback(() => {
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
  }, [basket, selectedItems]);

  const handleToggleSelect = useCallback(
    (item: IProduct) => {
      const isSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id);
      if (isSelected) {
        setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.id !== item.id));
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    },
    [selectedItems]
  );

  const handleToggleSelectBasket = useCallback(
    (item: IProductInBasket) => {
      const isSelected = selectedItemBasket.some((selectedItem) => selectedItem.product.id === item.product.id);
      if (isSelected) {
        setSelectedItemBasket(selectedItemBasket.filter((selectedItem) => selectedItem.product.id !== item.product.id));
      } else {
        setSelectedItemBasket([...selectedItemBasket, item]);
      }
    },
    [selectedItemBasket]
  );

  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
  }, []);

  const handleAddToInventory = useCallback(() => {
    const newProduct = { id: inventory.length + 1, title };
    setInventory([...inventory, newProduct]);
    setTitle('');
  }, [inventory, title]);

  const handleDeleteSelectedFromBasket = useCallback(() => {
    const updatedBasket = basket.filter((item) => !selectedItemBasket.some((selectedItem) => selectedItem.product.id === item.product.id));
    setBasket(updatedBasket);
    setSelectedItemBasket([]);
  }, [basket, selectedItemBasket]);

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
        <Inventory
          title={title}
          onTitleChange={handleTitleChange}
          onAddToInventory={handleAddToInventory}
          selectedItems={selectedItems}
          onAddSelectedToBasket={handleAddSelectedToBasket}
          onToggleSelect={handleToggleSelect}
          inventory={inventory}
        />
        <Basket
          selectedItemBasket={selectedItemBasket}
          onDeleteSelectedFromBasket={handleDeleteSelectedFromBasket}
          onToggleSelectBasket={handleToggleSelectBasket}
          basket={basket}
          calculateTotal={calculateTotal()}
        />
      </Container>
    </div>
  );
}

export default App;
