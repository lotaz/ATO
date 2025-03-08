export enum BlogType {
  News = 0,
  Even = 1
}

export enum BlogStatus {
  Approval = 0,
  Processing = 1,
  Rejected = 2
}

// Blog type interface
export interface Blog {
  blogId: string; // Use string for UUID
  title: string;
  linkImg: string;
  description: string;
  content: string;
  createBy: string; // Use string for UUID
  blogType: BlogType;
  blogStatus: BlogStatus;
  replyRequest?: string; // Optional field
  createDate: string; // You can use Date object, or ISO string
  updateTime?: string; // Optional field (can be Date object or ISO string)
}

// BlogCreateRequest type interface
export interface BlogCreateRequest {
  title: string;
  linkImg: string;
  description: string;
  content: string;
  blogType: BlogType;
}

// BlogUpdateRequest type interface
export interface BlogUpdateRequest {
  id?: string;
  title: string;
  linkImg: string;
  description: string;
  content: string;
  blogType: BlogType;
  blogStatus: BlogStatus;
  replyRequest?: string; // Optional field
}

export interface BlogResponse {
  success: boolean;
  data?: Blog;
  error?: string;
}

export interface BlogListResponse {
  success: boolean;
  data?: Blog[];
  error?: string;
}
