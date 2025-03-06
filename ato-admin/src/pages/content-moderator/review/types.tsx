export interface Review {
  id: string;
  type: 'system' | 'company';
  userId: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  companyId?: string;
  companyName?: string;
}
