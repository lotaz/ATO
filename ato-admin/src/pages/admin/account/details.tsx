import { Grid, Stack, Typography, Divider, Box, Chip } from '@mui/material';
import AppCard from '../../../components/cards/AppCard';
import Avatar from '@mui/material/Avatar';
import { UserOutlined } from '@ant-design/icons';

const UserDetails = () => {
  // Mock data - replace with actual API data later
  const userInfo = {
    fullName: 'Nguyễn Văn A',
    role: 'Quản trị viên',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    gender: 'Nam',
    status: 'Đang hoạt động',
    address: '123 Đường ABC, Quận XYZ, TP.HCM',
    company: 'Công ty TNHH ABC',
    joinDate: '01/01/2023',
    lastActive: '25/11/2023'
  };

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
              <Typography variant="h4">{userInfo.fullName}</Typography>
              <Stack direction="row" spacing={1}>
                <Chip label={userInfo.role} color="primary" size="small" />
                <Chip label={userInfo.status} color={userInfo.status === 'Đang hoạt động' ? 'success' : 'default'} size="small" />
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
              <InfoRow label="Họ và tên" value={userInfo.fullName} />
              <InfoRow label="Email" value={userInfo.email} />
              <InfoRow label="Số điện thoại" value={userInfo.phone} />
              <InfoRow label="Giới tính" value={userInfo.gender} />
              <InfoRow label="Địa chỉ" value={userInfo.address} />
            </Stack>
          </Box>

          <Divider />

          {/* Work Information */}
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Thông tin công việc
            </Typography>
            <Stack spacing={1}>
              <InfoRow label="Đơn vị" value={userInfo.company} />
              <InfoRow label="Vai trò" value={userInfo.role} />
              <InfoRow label="Trạng thái" value={userInfo.status} />
            </Stack>
          </Box>

          <Divider />

          {/* Account Information */}
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Thông tin tài khoản
            </Typography>
            <Stack spacing={1}>
              <InfoRow label="Ngày tham gia" value={userInfo.joinDate} />
              <InfoRow label="Hoạt động gần nhất" value={userInfo.lastActive} />
            </Stack>
          </Box>
        </Stack>
      </AppCard>
    </Stack>
  );
};

export default UserDetails;
