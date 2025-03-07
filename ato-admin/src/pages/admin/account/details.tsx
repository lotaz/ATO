import { UserOutlined } from '@ant-design/icons';
import { Box, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import AppCard from '../../../components/cards/AppCard';
import { getAccount } from '../../../redux/accountSlice';
import { RootState } from '../../../redux/store';
import { User } from '../../../types';

const UserDetails = () => {
  const account: User = useSelector((state: RootState) => state.account.specific);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const accountId = params.get('id');
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (accountId !== null) dispatch(getAccount(accountId));
  }, [accountId]);

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <Grid container spacing={2} sx={{ py: 1 }}>
      <Grid item xs={12} sm={4}>
        <Typography variant="subtitle1" color="textSecondary">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="body1">{value}</Typography>
      </Grid>
    </Grid>
  );
  return (
    <Stack spacing={3}>
      <AppCard>
        <Stack spacing={3}>
          {/* Header Section */}
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar
              sx={{
                width: 80,
                height: 80,
                backgroundColor: (theme) => theme.palette.primary.light
              }}
            >
              <UserOutlined style={{ fontSize: '2rem' }} />
            </Avatar>
            <Stack spacing={1}>
              <Typography variant="h4">{account?.fullname}</Typography>
              <Stack direction="row" spacing={1}>
                <Chip label={account?.roleName} color="primary" size="small" />
                <Chip
                  label={account?.isAccountActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                  color={account?.isAccountActive ? 'success' : 'default'}
                  size="small"
                />
              </Stack>
            </Stack>
          </Stack>

          <Divider />

          {/* Basic Information */}
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Thông tin cơ bản
            </Typography>
            <Stack spacing={1}>
              <InfoRow label="Họ và tên" value={account?.fullname} />
              <InfoRow label="Email" value={account?.email} />
              <InfoRow label="Số điện thoại" value={account?.phoneNumber} />
              <InfoRow label="Giới tính" value={account?.gender ? 'Nam' : 'Nữ'} />
            </Stack>
          </Box>

          <Divider />
        </Stack>
      </AppCard>
    </Stack>
  );
};

export default UserDetails;
