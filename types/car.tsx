export interface Car {
  brand: string;
  category: string;
  name: string;
  price: string;
  object_id: string;
  spec: {id: number; name: string; content: string}[];
  image: string;
}
