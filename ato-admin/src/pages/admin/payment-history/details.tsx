import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MultipleFileUploader } from '../../../components/upload/MultipleFileUploader';
import { get, put } from '../../../helpers/axios-helper';
export enum WithdrawalStatus {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Cancelled = 3
}
interface WithdrawalDetails {
  withdrawalId: string;
  amount: number;
  transactionReference?: string;
  processedDate: string;
  note?: string;
  transactionImage?: string;
  withdrawalStatus: string;
  tourCompany: {
    companynName: string;
  };
  touristFacility: {
    touristFacilityName: string;
  };
}

interface UpdateWithdrawalRequest {
  note: string;
  transactionImg: string[];
}

interface BankAccountResponse {
  bankAccountId: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  branchName: string;
  isPrimary: boolean;
  createdDate: Date;
  updatedDate?: Date;
}

const WithdrawalDetailsPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const [loading, setLoading] = useState(true);
  const [withdrawal, setWithdrawal] = useState<WithdrawalDetails | null>(null);
  const [note, setNote] = useState('');
  const [transactionImgs, setTransactionImgs] = useState<string[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccountResponse[]>([]);
  const navigate = useNavigate();
  const [confirmCompleteOpen, setConfirmCompleteOpen] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

  const fetchBankAccounts = async (ownerId: string) => {
    try {
      const response = await get(`/bank-accounts/owner/${ownerId}`);
      setBankAccounts(response.data);
    } catch (error) {
      console.error('Failed to fetch bank accounts:', error);
    }
  };
  const getWithdrawalStatusText = (status: number) => {
    switch (status) {
      case 0:
        return 'Mới';
      case 1:
        return 'Đang xử lý';
      case 2:
        return 'Hoàn thành';
      case 3:
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  useEffect(() => {
    const fetchWithdrawal = async () => {
      try {
        const response = await get(`/admin/withdrawals/${id}`);
        setWithdrawal(response.data);
        setNote(response.data.note || '');
        setTransactionImgs(response.data.transactionImage ? [response.data.transactionImage] : []);

        // Fetch bank accounts for the owner
        const ownerId = response.data.tourCompany?.tourCompanyId || response.data.touristFacility?.touristFacilityId;
        if (ownerId) {
          await fetchBankAccounts(ownerId);
        }
      } catch (error) {
        console.error('Failed to fetch withdrawal:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawal();
  }, [id]);

  const handleComplete = async () => {
    try {
      const request: UpdateWithdrawalRequest = { note, transactionImgs };
      const response = await put(`/admin/withdrawals/complete/${id}`, request);

      if (response.data.status) {
        enqueueSnackbar('Cập nhật lịch sử giải ngân thành công', { variant: 'success' });
        navigate('/admin/payment-history');
      } else {
        enqueueSnackbar(response.data.message, { variant: 'error' });
      }
    } catch (error) {
      console.error('Failed to complete withdrawal:', error);
      enqueueSnackbar('Có lỗi xảy ra khi cập nhật lịch sử giải ngân', { variant: 'error' });
    }
  };

  const handleCancel = async () => {
    try {
      const request: UpdateWithdrawalRequest = { note, transactionImgs: [] };
      const response = await put(`/admin/withdrawals/cancel/${id}`, request);

      if (response.data.status) {
        enqueueSnackbar('Cập nhật lịch sử giải ngân thành công', { variant: 'success' });
        navigate('/admin/payment-history');
      } else {
        enqueueSnackbar(response.data.message, { variant: 'error' });
      }
    } catch (error) {
      console.error('Failed to cancel withdrawal:', error);
      enqueueSnackbar('Có lỗi xảy ra khi cập nhật lịch sử giải ngân', { variant: 'error' });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!withdrawal) {
    return (
      <Box p={4}>
        <Typography variant="h6">Không tìm thấy yêu cầu giải ngân</Typography>
      </Box>
    );
  }

  const handleCompleteClick = () => {
    if (transactionImgs.length === 0) {
      enqueueSnackbar('Vui lòng thêm ảnh giao dịch trước khi hoàn thành', { variant: 'warning' });
      return;
    }
    setConfirmCompleteOpen(true);
  };

  const handleCancelClick = () => {
    setConfirmCancelOpen(true);
  };

  const handleCompleteConfirm = async () => {
    setConfirmCompleteOpen(false);
    await handleComplete();
  };

  const handleCancelConfirm = async () => {
    setConfirmCancelOpen(false);
    await handleCancel();
  };
  const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="body2" color="text.secondary">
        {label}:
      </Typography>
      <Typography variant="body2" fontWeight="medium">
        {value}
      </Typography>
    </Box>
  );
  return (
    <Box>
      <Paper sx={{ p: 3, boxShadow: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            Chi tiết yêu cầu giải ngân
          </Typography>

          <Stack direction={'row'} spacing={3}>
            <Stack direction={'column'} sx={{ width: '100%' }}>
              <Paper sx={{ p: 2, backgroundColor: 'background.paper' }}>
                <Stack spacing={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Thông tin cơ bản
                  </Typography>
                  <Divider />
                  <Stack spacing={1.5}>
                    <InfoRow label="ID" value={withdrawal.withdrawalId} />
                    <InfoRow label="Ngày xử lý" value={new Date(withdrawal.processedDate).toLocaleDateString('vi-VN')} />
                    <InfoRow label="Số tiền" value={`${new Intl.NumberFormat('vi-VN').format(withdrawal.amount)} VNĐ`} />
                    <InfoRow
                      label="Trạng thái"
                      value={
                        <Chip
                          label={getWithdrawalStatusText(withdrawal.withdrawalStatus)}
                          color={
                            withdrawal.withdrawalStatus === WithdrawalStatus.New
                              ? 'primary'
                              : withdrawal.withdrawalStatus === WithdrawalStatus.Completed
                                ? 'success'
                                : withdrawal.withdrawalStatus === WithdrawalStatus.Cancelled
                                  ? 'error'
                                  : 'warning'
                          }
                          size="small"
                        />
                      }
                    />
                    <InfoRow label="Mã giao dịch" value={withdrawal.transactionReference || 'N/A'} />
                    <InfoRow
                      label="Đối tượng"
                      value={withdrawal.tourCompany?.companynName || withdrawal.touristFacility?.touristFacilityName || 'N/A'}
                    />
                  </Stack>
                </Stack>
              </Paper>
            </Stack>

            <Stack direction={'column'} sx={{ width: '100%' }}>
              <Paper sx={{ p: 2, mb: 1, backgroundColor: 'grey.100' }}>
                <Stack spacing={2} sx={{ height: 238 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Tài khoản ngân hàng
                  </Typography>
                  <Divider />
                  {bankAccounts.length > 0 ? (
                    bankAccounts.map((account) => (
                      <Stack key={account.bankAccountId} spacing={1}>
                        <InfoRow label="Ngân hàng" value={account.bankName} />
                        <InfoRow label="Số tài khoản" value={account.accountNumber} />
                        <InfoRow label="Tên tài khoản" value={account.accountName} />
                        <InfoRow label="Chi nhánh" value={account.branchName} />
                        {account.isPrimary && <Chip label="Tài khoản chính" size="small" color="primary" />}
                      </Stack>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Không có thông tin tài khoản ngân hàng
                    </Typography>
                  )}
                </Stack>
              </Paper>
            </Stack>
          </Stack>

          <TextField
            label="Nội dung ghi chú"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />

          <Stack spacing={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              Ảnh giao dịch
            </Typography>
            <MultipleFileUploader values={transactionImgs} onChange={setTransactionImgs} maxFiles={5} />
          </Stack>

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="contained"
              color="success"
              onClick={handleCompleteClick}
              disabled={withdrawal.withdrawalStatus !== WithdrawalStatus.New}
              sx={{ minWidth: 120 }}
            >
              Hoàn thành
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCancelClick}
              disabled={withdrawal.withdrawalStatus !== WithdrawalStatus.New}
              sx={{ minWidth: 120 }}
            >
              Hủy bỏ
            </Button>
            <Button variant="outlined" onClick={() => navigate('/admin/payment-history')} sx={{ minWidth: 120 }}>
              Quay lại
            </Button>
          </Box>
        </Stack>
      </Paper>

      {/* Complete Confirmation Dialog */}
      <Dialog open={confirmCompleteOpen} onClose={() => setConfirmCompleteOpen(false)}>
        <DialogTitle>Xác nhận hoàn thành</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn hoàn thành yêu cầu giải ngân này?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmCompleteOpen(false)}>Hủy</Button>
          <Button onClick={handleCompleteConfirm} color="success" variant="contained">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={confirmCancelOpen} onClose={() => setConfirmCancelOpen(false)}>
        <DialogTitle>Xác nhận hủy bỏ</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn hủy bỏ yêu cầu giải ngân này?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmCancelOpen(false)}>Hủy</Button>
          <Button onClick={handleCancelConfirm} color="error" variant="contained">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  // Add this helper component outside the main component
};

export default WithdrawalDetailsPage;
