export interface Car {
  brand_name: string;
  category: string;
  price: number;
  category_level_1_name: string;
  category_level_1_id: number;
  category_level_2_id: number;
  category_level_2_name: string;
  specs: {id: number; spec_name: string; content: string}[];
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
  price: number;
  specs: {
    spec_name: string;
    content: string;
  }[];
}
