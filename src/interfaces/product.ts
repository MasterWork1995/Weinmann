export interface IProduct {
  id: number;
  title: string;
}

export interface IProductInBasket {
  count: number;
  product: IProduct;
}
