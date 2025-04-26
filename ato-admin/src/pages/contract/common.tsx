import { SigningStatus } from '../../types/admin/contract.types';

export const getSigningStatusInfo = (status: SigningStatus) => {
  switch (status) {
    case SigningStatus.New:
      return { label: 'Mới', color: 'default' };
    case SigningStatus.Signed:
      return { label: 'Đã ký', color: 'success' };
    case SigningStatus.RequestExtend:
      return { label: 'Yêu cầu gia hạn', color: 'warning' };
    case SigningStatus.ApprovedExtend:
      return { label: 'Đã duyệt gia hạn', color: 'info' };
    case SigningStatus.AboutToEnd:
      return { label: 'Sắp hết hạn', color: 'warning' };
    case SigningStatus.Ended:
      return { label: 'Đã hết hạn', color: 'error' };
    case SigningStatus.Rejected:
      return { label: 'Đã từ chối', color: 'error' };
    default:
      return { label: 'Không xác định', color: 'default' };
  }
};
