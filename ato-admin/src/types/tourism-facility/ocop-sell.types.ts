export interface OCOPSell {
  ocopSellId: string;
  sellVolume: number;
  salePrice: number;
  manufacturingDate?: Date;
  expiryDate?: Date;
  createDate: Date;
  updateDate?: Date;
  productId: string;
  product?: any; // Replace with proper Product type
}

export interface CreateOCOPSell {
  sellVolume: number;
  salePrice: number;
  manufacturingDate?: Date;
  expiryDate?: Date;
  productId: string;
}

export interface UpdateOCOPSell {
  sellVolume: number;
  salePrice: number;
  manufacturingDate?: Date;
  expiryDate?: Date;
  productId: string;
}
