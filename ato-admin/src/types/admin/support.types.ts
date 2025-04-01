export enum IssueType {
  SystemBug = 0,
  PerformanceIssue = 1,
  IntegrationIssue = 2,
  LoginIssue = 3,
  AccountLocked = 4,
  PermissionIssue = 5,
  FailedPayment = 6,
  RefundRequest = 7,
  IncorrectCharge = 8,
  FeatureRequest = 9,
  DataUpdateRequest = 10,
  Other = 11
}

export const IssueTypeLabels: Record<IssueType, string> = {
  [IssueType.SystemBug]: 'Lỗi phần mềm hoặc chức năng không hoạt động đúng',
  [IssueType.PerformanceIssue]: 'Hệ thống chậm, tải trang lâu',
  [IssueType.IntegrationIssue]: 'Lỗi kết nối API hoặc tích hợp hệ thống khác',
  [IssueType.LoginIssue]: 'Không đăng nhập được',
  [IssueType.AccountLocked]: 'Tài khoản bị khóa hoặc vô hiệu hóa',
  [IssueType.PermissionIssue]: 'Không có quyền truy cập vào chức năng cần thiết',
  [IssueType.FailedPayment]: 'Thanh toán không thành công',
  [IssueType.RefundRequest]: 'Yêu cầu hoàn tiền',
  [IssueType.IncorrectCharge]: 'Sai lệch về số tiền bị trừ',
  [IssueType.FeatureRequest]: 'Đề xuất tính năng mới',
  [IssueType.DataUpdateRequest]: 'Yêu cầu cập nhật thông tin cá nhân hoặc dữ liệu',
  [IssueType.Other]: 'Khác'
};

export interface UserSupport {
  supportId: string;
  issueType: IssueType;
  issueTypeDescription: string;
  fullname: string;
  email: string;
  supportMessage: string;
  requestDate: string;
  responseDate?: string;
  responseMessage?: string;
  isResolved: boolean;
  updatedDate?: string;
  responeBy?: string;
}

export interface UserSupportRequest {
  issueType: IssueType;
  fullname: string;
  email: string;
  supportMessage: string;
}

export interface ReplyUserSupportRequest {
  supportId: string;
  supportMessage: string;
  responseDate?: string;
  responseMessage?: string;
  responeBy?: string;
}
