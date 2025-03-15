import { EditOutlined } from '@ant-design/icons';
import { Avatar, Box, Button, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import AppCard from '../../../components/cards/AppCard';
import { ADMIN_URLs } from '../../../constants/admin-urls';
import { getFacility } from '../../../redux/facilitySlice';
import { RootState } from '../../../redux/store';

const FacilityDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const facilityId = params.get('id');

  const facility = useSelector((state: RootState) => state.facility.specific);

  useEffect(() => {
    if (facilityId) {
      dispatch(getFacility(facilityId));
    }
  }, [dispatch, facilityId]);

  const InfoRow = ({ label, value }: { label: string; value: string | null }) => (
    <Grid container spacing={2} sx={{ py: 1 }}>
      <Grid item xs={12} sm={4}>
        <Typography variant="subtitle1" color="textSecondary">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="body1">{value || '-'}</Typography>
      </Grid>
    </Grid>
  );

  if (!facility) return null;

  return (
    <Stack spacing={3}>
      <AppCard>
        <Stack spacing={3}>
          {/* Header Section */}
          <Stack direction="row" justifyContent="space-between" alignItems="start">
            <Stack direction="row" spacing={3} alignItems="center">
              <Box
                component="img"
                src={facility.logoURL}
                alt={facility.touristFacilityName}
                sx={{
                  width: 200,
                  height: 120,
                  borderRadius: 1,
                  objectFit: 'cover'
                }}
              />
              <Stack spacing={1}>
                <Typography variant="h4">{facility.touristFacilityName}</Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={facility.website ? 'Website có sẵn' : 'Chưa có website'}
                    color={facility.website ? 'success' : 'default'}
                    size="small"
                  />
                </Stack>
              </Stack>
            </Stack>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditOutlined />}
              onClick={() => navigate(`${ADMIN_URLs.FACILITY.UPDATE}?id=${facility.touristFacilityId}`)}
            >
              Chỉnh sửa
            </Button>
          </Stack>

          <Divider />
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Người phụ trách
            </Typography>
            {facility.account ? (
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={facility.account.avatarURL!} alt={facility.account.fullname} sx={{ width: 64, height: 64 }} />
                <Stack spacing={0.5}>
                  <Typography variant="h6">{facility.account.fullname}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {facility.account.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {facility.account.phoneNumber}
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <Typography color="text.secondary">Chưa có người phụ trách</Typography>
            )}
          </Box>

          {/* Basic Information */}
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Thông tin cơ bản
            </Typography>
            <Stack spacing={1}>
              <InfoRow label="Tên cơ sở" value={facility.touristFacilityName} />
              <InfoRow label="Website" value={facility.website} />
              <InfoRow label="Ngày tạo" value={dayjs(facility.createDate).format('DD/MM/YYYY HH:mm')} />
              {facility.updateTime && <InfoRow label="Cập nhật lần cuối" value={dayjs(facility.updateTime).format('DD/MM/YYYY HH:mm')} />}
            </Stack>
          </Box>

          <Divider />

          {/* Contact Information */}
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Thông tin liên hệ
            </Typography>
            <Stack spacing={1}>
              <InfoRow label="Địa chỉ" value={facility.address} />
              <InfoRow label="Email" value={facility.emailTouristFacility} />
            </Stack>
          </Box>

          <Divider />

          {/* Description */}
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Mô tả
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {facility.description || 'Chưa có mô tả'}
            </Typography>
          </Box>
        </Stack>
      </AppCard>
    </Stack>
  );
};

export default FacilityDetails;
