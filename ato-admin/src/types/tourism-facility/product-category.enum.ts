export enum ProductCategory {
  Food = 0,
  Beverage = 1,
  HerbalMedicine = 2,
  Textiles = 3,
  SouvenirsFurnitureDecoration = 4,
  CommunityTourismServicesAndTouristAttractions = 5,
  Other = 6
}

export const ProductCategoryLabels: Record<ProductCategory, string> = {
  [ProductCategory.Food]: 'Thực phẩm',
  [ProductCategory.Beverage]: 'Đồ uống',
  [ProductCategory.HerbalMedicine]: 'Thảo dược',
  [ProductCategory.Textiles]: 'Vải may mặc',
  [ProductCategory.SouvenirsFurnitureDecoration]: 'Lưu niệm - Nội thất - Trang trí',
  [ProductCategory.CommunityTourismServicesAndTouristAttractions]: 'Dịch vụ du lịch cộng đồng và điểm du lịch',
  [ProductCategory.Other]: 'Khác'
};
