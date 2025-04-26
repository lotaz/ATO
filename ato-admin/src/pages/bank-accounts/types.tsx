export enum OwnerType {
  TourismCompany = 0,
  TouristFacility = 1
}

export interface BankAccountResponse {
  bankAccountId: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  branchName: string;
  isPrimary: boolean;
  createdDate: Date;
  updatedDate?: Date;
}

export interface BankAccountRequest {
  ownerId: string;
  ownerType: OwnerType;
  bankName: string;
  accountNumber: string;
  accountName: string;
  branchName: string;
  isPrimary: boolean;
}
