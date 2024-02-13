export interface Car {
  brand: string;
  category: string;
  name: string;
  price: string;
  category_level_1_id: number;
  category_level_2_id: number;
  spec: {id: number; name: string; content: string}[];
  image: string;
}

export interface SelectedCar {
  recommendation: SelectedCarItem;
  competitor: SelectedCarItem[];
}

export interface SelectedCarItem {
  company_brand_name: string;
  category_level_1_id: number;
  category_level_1_name: string;
  category_level_2_id: number;
  category_level_2_name: string;
  image: string;
  price: string;
  specs: {
    spec_name: string;
    content: string;
  }[];
}
