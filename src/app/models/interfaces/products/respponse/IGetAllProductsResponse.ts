export interface IGetAllProductsResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  amount: number;
  category: {
    id: number;
    name: string;
  };
}
