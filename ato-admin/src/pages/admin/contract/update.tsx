import { ArrowLeftOutlined } from '@ant-design/icons';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, CardContent, Grid, InputAdornment, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_URLs } from '../../../constants/admin-urls';
import { fetchContract, updateContract } from '../../../redux/admin/contract.slice';
import { getCompanies } from '../../../redux/companySlice';
import { getFacilities } from '../../../redux/facilitySlice';
import { RootState } from '../../../redux/store';
import { Contract, UpdateContractRequest } from '../../../types/admin/contract.types';
import { put } from '../../../helpers/axios-helper';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const UpdateContract = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const { specific: contract } = useSelector((state: RootState) => state.contractSlice);
  const dispatch = useDispatch<any>();

  const [formData, setFormData] = useState<Partial<UpdateContractRequest>>({
    tourCompanyId: undefined,
    touristFacilityId: undefined,
    discountRate: 0,
    startDate: undefined, // Set a default start date if neede,
    endDate: undefined, // Set a default end date if needed,
    contractContent: ''
  });
  // Determine if contract is for company or facility
  const isCompanyContract = !!contract?.tourCompany?.tourCompanyId;
  const isFacilityContract = !!contract?.touristFacility?.touristFacilityId;

  useEffect(() => {
    if (id) {
      dispatch(fetchContract(id));
      dispatch(getCompanies());
      dispatch(getFacilities());
    }
  }, [dispatch, id]);

  useEffect(() => {
    const con = contract as Contract;

    console.log('con', con);
    if (con) {
      setFormData({
        ...con,
        tourCompanyId: con.tourCompanyId,
        touristFacilityId: con.touristFacilityId,
        startDate: dayjs(con.startDate),
        endDate: dayjs(con.endDate),
        facilityName: con.touristFacility?.touristFacilityName,
        companyName: con.tourCompany?.companynName
      });
    }
  }, [contract]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateContract({ ...formData, contractId: id! }));
      navigate(ADMIN_URLs.CONTRACT.INDEX);
    } catch (error) {
      console.error('Error updating contract:', error);
    }
  };

  useEffect(() => {
    dispatch(getCompanies());
    dispatch(getFacilities());
  }, [dispatch]);

  const handleChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleDateChange = (field: string) => (date: any) => {
    setFormData({
      ...formData,
      [field]: date
    });
  };

  const [isEditing, setIsEditing] = useState(false);
  const [isProcessingExtend, setIsProcessingExtend] = useState(false);

  useEffect(() => {
    if (contract) {
      setIsEditing(contract.signingStatus === 0); // 0 = New
    }
  }, [contract]);

  const handleAcceptExtend = async () => {
    setIsProcessingExtend(true);
    try {
      const response = await put(`/contract/approve-extend/${id}`, {});
      const res = response.data;

      if (res.status) {
        enqueueSnackbar('Đã chấp nhận gia hạn hợp đồng', { variant: 'success' });
        navigate(ADMIN_URLs.CONTRACT.INDEX);
      } else {
        enqueueSnackbar(res.message || 'Không thể chấp nhận gia hạn', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Không thể chấp nhận gia hạn', { variant: 'error' });
    } finally {
      setIsProcessingExtend(false);
    }
  };

  const handleRejectExtend = async () => {
    setIsProcessingExtend(true);
    try {
      const response = await put(`/contract/reject/${id}`, {});
      const res = response.data;

      if (res.status) {
        enqueueSnackbar('Đã từ chối gia hạn hợp đồng', { variant: 'success' });
        navigate(ADMIN_URLs.CONTRACT.INDEX);
      } else {
        enqueueSnackbar(res.message || 'Không thể từ chối gia hạn', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Không thể từ chối gia hạn', { variant: 'error' });
    } finally {
      setIsProcessingExtend(false);
    }
  };

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'accept' | 'reject' | null>(null);

  const handleConfirmAction = async () => {
    setConfirmDialogOpen(false);
    if (confirmAction === 'accept') {
      await handleAcceptExtend();
    } else if (confirmAction === 'reject') {
      await handleRejectExtend();
    }
  };

  const handleAcceptClick = () => {
    setConfirmAction('accept');
    setConfirmDialogOpen(true);
  };

  const handleRejectClick = () => {
    setConfirmAction('reject');
    setConfirmDialogOpen(true);
  };

  const renderConfirmDialog = () => (
    <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
      <DialogTitle>Xác nhận hành động</DialogTitle>
      <DialogContent>
        <Typography>
          {confirmAction === 'accept'
            ? 'Bạn có chắc chắn muốn chấp nhận gia hạn hợp đồng này?'
            : 'Bạn có chắc chắn muốn từ chối gia hạn hợp đồng này?'}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmDialogOpen(false)}>Hủy</Button>
        <Button variant="contained" onClick={handleConfirmAction}>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(ADMIN_URLs.CONTRACT.INDEX)}>
          Quay lại danh sách
        </Button>
        <Typography variant="h5">Chỉnh sửa hợp đồng</Typography>
      </Stack>

      <Card>
        <CardContent>
          {contract?.signingStatus === 2 && ( // 2 = Extend Request
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Yêu cầu gia hạn hợp đồng
              </Typography>
              <Typography>Ngày kết thúc đề xuất: {dayjs(contract.endDate).format('DD/MM/YYYY')}</Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <LoadingButton variant="contained" color="success" loading={isProcessingExtend} onClick={handleAcceptClick}>
                  Chấp nhận gia hạn
                </LoadingButton>
                <LoadingButton variant="outlined" color="error" loading={isProcessingExtend} onClick={handleRejectClick}>
                  Từ chối gia hạn
                </LoadingButton>
              </Stack>
            </Box>
          )}

          <Tabs value={0} sx={{ mb: 3 }} variant={isCompanyContract || isFacilityContract ? 'fullWidth' : 'standard'}>
            {!isFacilityContract && <Tab label="Hợp đồng công ty" />}
            {!isCompanyContract && <Tab label="Hợp đồng cơ sở du lịch" />}
          </Tabs>

          <Grid container spacing={3}>
            {isCompanyContract && (
              <Grid item xs={12} md={6}>
                <TextField InputProps={{ disabled: true }} fullWidth label="Công ty du lịch" type="text" value={formData.companyName} />
              </Grid>
            )}

            {isFacilityContract && (
              <Grid item xs={12} md={6}>
                <TextField InputProps={{ disabled: true }} fullWidth label="Cơ sở du lịch" type="text" value={formData?.facilityName} />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tỷ lệ chiết khấu"
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>
                }}
                disabled={!isEditing}
                value={formData.discountRate}
                onChange={handleChange('discountRate')}
                required
                inputProps={{
                  min: 0,
                  max: 100
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DatePicker
                label="Ngày bắt đầu"
                value={formData.startDate}
                onChange={handleDateChange('startDate')}
                format="DD/MM/YYYY"
                disabled={!isEditing}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DatePicker
                label="Ngày kết thúc"
                value={formData.endDate}
                onChange={handleDateChange('endDate')}
                format="DD/MM/YYYY"
                disabled={!isEditing}
                minDate={dayjs(formData.startDate)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nội dung hợp đồng"
                multiline
                rows={4}
                value={formData.contractContent}
                onChange={handleChange('contractContent')}
                required
                disabled={!isEditing}
              />
            </Grid>

            {isEditing && (
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                  <Button variant="outlined" onClick={() => navigate(ADMIN_URLs.CONTRACT.INDEX)}>
                    Hủy
                  </Button>
                  <Button type="submit" variant="contained">
                    Lưu
                  </Button>
                </Stack>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      {renderConfirmDialog()}
    </Stack>
  );
};

export default UpdateContract;
