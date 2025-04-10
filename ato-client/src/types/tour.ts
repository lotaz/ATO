export enum TimeType {
  1 = "Giây",
  2 = "Phút",
  3 = "Giờ",
  4 = "Ngày",
  5 = "Tháng",
  6 = "Năm",
}

export enum TypeActivity {
  1 = "Nơi Ở",
  2 = "Di Chuyển",
  3 = "Điểm Đến",
}

export enum VehicleType {
  1 = "Xe 4 Chỗ",
  2 = "Xe 7 Chỗ",
  3 = "Xe 16 Chỗ",
  4 = "Xe 29 Chỗ",
  5 = "Xe 45 Chỗ",
  6 = "Giường Nằm Đơn",
  7 = "Giường Nằm Đôi",
  8 = "Máy Bay",
}

export interface TourGuideRespone_Account {
  id: string;
  email?: string;
  userName?: string;
  phoneNumber?: string;
  fullname?: string;
  gender?: boolean;
  avatarURL?: string;
  dob?: Date;
  isAccountActive: boolean;
}

export interface AgriculturalTourPackage_TourGuide_Respone {
  guideId: string;
  userId: string;
  bio?: string;
  languages?: string;
  expertiseArea?: string;
  rating: number;
  account?: TourGuideRespone_Account;
}

export interface AgriculturalTourPackage_TourDestination_Activity_Respone {
  activityId: string;
  activityName: string;
  description?: string;
  durationInHours: number;
  location?: string;
  imgs?: string[];
  breakTimeInMinutes: number;
  startTime: Date;
  endTime: Date;
  products?: ProductDTO_Guest[];
}

export interface ProductDTO_Guest {
  productId: string;
  productName: string;
  imgs?: string[];
  price?: number;
  description?: string;
  additional?: string;
  nutritionType?: string;
  age?: string;
  ingredient?: string;
  volume?: string;
  origin?: string;
  manufacturer?: string;
  addressManufacturer?: string;
  sellVolume: number;
}

export interface DriverRespone {
  driverId: string;
  driverName: string;
  phoneNumber: string;
  vehicleType: VehicleType;
  imgs?: string[];
}

export interface AccommodationRespone {
  accommodationId: string;
  accommodationName: string;
  accommodationDescription?: string;
  address: string;
  phoneNumber: string;
  star?: number;
  imgs?: string[];
}

export interface TourismPackageRespone_Guest {
  packageId: string;
  packageName: string;
  description?: string;
  price: number;
  durations: number;
  durationsType: TimeType;
}

export interface AgriculturalTourPackage_TourDestination_Respone_Guest {
  tourDestinationId: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  checkInDate?: Date;
  checkOutDate?: Date;
  visitOrder: number;
  typeActivity: TypeActivity;
  tourismPackage?: TourismPackageRespone_Guest;
  driver?: DriverRespone;
  accommodation?: AccommodationRespone;
  activity?: AgriculturalTourPackage_TourDestination_Activity_Respone;
  tourGuides?: AgriculturalTourPackage_TourGuide_Respone[];
}

export interface AgriculturalTourPackageRespone_Guest {
  tourId: string;
  packageName: string;
  description?: string;
  imgs?: string[];
  slot: number;
  price: number;
  startTime: Date;
  endTime: Date;
  durations: number;
  durationsType: TimeType;
  tourDestinations?: AgriculturalTourPackage_TourDestination_Respone_Guest[];
  tourGuides?: AgriculturalTourPackage_TourGuide_Respone[];
}
