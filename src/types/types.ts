export type Product = {
  productId: string;
  sellerId: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  imageKey: string;
  createdAt: string;
};

export type GetProductsResponse = {
  items: Product[];
  lastKey: string | null;
};
