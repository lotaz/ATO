import { ArrowLeftOutlined, CheckCircleOutlined, CloseCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router-dom';
import { get, post, put } from '../../helpers/axios-helper';
import { Contract } from '../../types/admin/contract.types';
import { getSigningStatusInfo } from './common';

const ContractDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const contractId = params.get('id');
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otpAction, setOtpAction] = useState<'sign' | 'reject' | 'extend' | null>(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [extensionMonths, setExtensionMonths] = useState(6);
  // Fetch contract details based on contractId
  const fetchContract = async () => {
    if (contractId) {
      setLoading(true);
      try {
        const response = await get(`/contract/${contractId}`);
        setContract(response.data);
      } catch (error) {
        console.error('Không thể tải hợp đồng:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchContract();
  }, [contractId]);

  if (loading) {
    return (
      <Box textAlign="center">
        <Typography>Đang tải...</Typography>
      </Box>
    );
  }

  if (!contract) {
    return (
      <Box textAlign="center">
        <Typography>Không tìm thấy hợp đồng</Typography>
      </Box>
    );
  }

  const isNewContract = contract?.signingStatus === 0; // Assuming 0 is the status for new contracts
  const daysUntilEnd = contract ? dayjs(contract.endDate).diff(dayjs(), 'day') : 0;
  const canExtend = daysUntilEnd <= 14 && daysUntilEnd >= 0;

  const handleSendOtp = async (action: 'sign' | 'reject' | 'extend') => {
    try {
      setExtensionMonths(6);
      setOtp('');
      setBtnLoading(true);
      const response = await post(`/contract/send-otp/${contractId}`, {});
      if (response.data.status) {
        setOtpAction(action);
        setShowOtpDialog(true);
      } else {
        enqueueSnackbar(response.data.message, { variant: 'error' });

        console.error('Failed to send OTP:', response.data.message);
      }
    } catch (error) {
      console.error('Failed to send OTP:', error);
    } finally {
      setBtnLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await post(`/contract/verify-otp/${contractId}/${otp}`, {});
      if (response.data.status) {
        setShowOtpDialog(false);
        // Execute the intended action after successful OTP verification
        if (otpAction === 'sign') {
          const signResponse = await put(`/contract/sign/${contractId}`, {});
          const res = signResponse.data;

          if (res.status) {
            console.log('Contract signed successfully');
            fetchContract();
          } else {
            console.error('Failed to sign contract:', res.message);
          }

          enqueueSnackbar(res.message, { variant: res.status ? 'success' : 'error' });
        } else if (otpAction === 'reject') {
          const rejectResponse = await put(`/contract/reject/${contractId}`, {});
          const res = rejectResponse.data;

          if (res.status) {
            console.log('Contract rejected successfully');
            fetchContract();
          } else {
            console.error('Failed to reject contract:', res.message);
          }
          enqueueSnackbar(res.message, { variant: res.status ? 'success' : 'error' });
        } else if (otpAction === 'extend') {
          const extendResponse = await put(`/contract/extend/${contractId}/${extensionMonths}`, {});
          const res = extendResponse.data;
          if (res.status) {
            console.log('Contract extended successfully');
            fetchContract();
          } else {
            console.error('Failed to extend contract:', res.message);
          }
          enqueueSnackbar(res.message, { variant: res.status ? 'success' : 'error' });
        }
      } else {
        console.error('Failed to verify OTP:', response.message);
        enqueueSnackbar(response.data.message, { variant: 'error' });
      }
    } catch (error) {
      console.error('Failed to verify OTP:', error);
    }
  };

  // Modify existing button handlers to trigger OTP flow
  const handleSign = async () => {
    await handleSendOtp('sign');
  };

  const handleReject = async () => {
    await handleSendOtp('reject');
  };

  const handleExtend = async () => {
    await handleSendOtp('extend');
  };

  // Add OTP dialog component
  const renderOtpDialog = () => (
    <Dialog open={showOtpDialog} onClose={() => setShowOtpDialog(false)}>
      <DialogTitle>Xác thực OTP</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {otpAction === 'extend' && (
            <TextField
              label="Số tháng gia hạn"
              type="number"
              value={extensionMonths}
              onChange={(e) => setExtensionMonths(Number(e.target.value))}
              fullWidth
              sx={{ mb: 2 }}
              inputProps={{ min: 6, max: 60 }}
            />
          )}
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: '3rem',
              height: '3rem',
              margin: '0 0.5rem',
              fontSize: '1.5rem',
              borderRadius: 4,
              border: '1px solid rgba(0,0,0,0.3)'
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowOtpDialog(false)}>Hủy</Button>
        <Button variant="contained" onClick={handleVerifyOtp}>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Stack spacing={3}>
      <Box>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </Box>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Thông tin hợp đồng
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Mã hợp đồng
                  </Typography>
                  <Typography>{contract.contractId}</Typography>
                </Box>
                {contract.tourCompanyId && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Công ty du lịch
                    </Typography>
                    <Typography>{contract.tourCompany?.companynName}</Typography>
                  </Box>
                )}
                {contract.touristFacilityId && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Cơ sở du lịch
                    </Typography>
                    <Typography>{contract.touristFacility?.touristFacilityName}</Typography>
                  </Box>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Chi tiết hợp đồng
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Tỷ lệ chiết khấu
                  </Typography>
                  <Typography>{contract.discountRate}%</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Thời hạn hợp đồng
                  </Typography>
                  <Typography>
                    {dayjs(contract.startDate).format('DD/MM/YYYY')} - {dayjs(contract.endDate).format('DD/MM/YYYY')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Trạng thái
                  </Typography>
                  <Typography>{getSigningStatusInfo(contract.signingStatus).label}</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Nội dung hợp đồng
              </Typography>
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 1,
                  overflowY: 'auto'
                }}
              >
                <p>{contract?.contractContent || 'Không có nội dung hợp đồng'}</p>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                {isNewContract && (
                  <>
                    <Button
                      disabled={btnLoading}
                      variant="contained"
                      color="success"
                      startIcon={<CheckCircleOutlined />}
                      onClick={handleSign}
                    >
                      Ký hợp đồng
                    </Button>
                    <Button
                      disabled={btnLoading}
                      variant="contained"
                      color="error"
                      startIcon={<CloseCircleOutlined />}
                      onClick={handleReject}
                    >
                      Từ chối
                    </Button>
                  </>
                )}
                {canExtend && (
                  <Button disabled={btnLoading} variant="contained" color="primary" startIcon={<HistoryOutlined />} onClick={handleExtend}>
                    Gia hạn hợp đồng
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {renderOtpDialog()}
    </Stack>
  );
};

export default ContractDetails;
