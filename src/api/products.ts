// api.js
import { useQuery } from 'react-query';
import { IProduct } from '../interfaces/product';

const fetchProducts = async () => {
  const response = await fetch('https://dummyjson.com/products?skip=0&limit=5');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  const res = data.products.map((item: IProduct) => {
    return {
      id: item.id,
      title: item.title
    };
  });

  return res;
};

export default function useProducts() {
  return useQuery('products', fetchProducts);
}
