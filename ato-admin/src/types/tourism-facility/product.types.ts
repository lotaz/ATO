export interface Product {
  productId: string;
  productName: string;
  imgs: string[];
  description: string;
  additional: string;
  nutritionType: string;
  age: string;
  ingredient: string;
  volume: string;
  origin: string;
  manufacturer: string;
  addressManufacturer: string;
  unitProduct: number;
  productCategory: number;
  createDate: string;
  updateDate: string;
  descriptionAPI: string;
}

export interface ProductResponse {
  data: Product[];
  total: number;
}

export interface ProductParams {
  page?: number;
  pageSize?: number;
  search?: string;
}