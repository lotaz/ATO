import { Grid, Stack, Typography, Divider, Box, Chip, Button } from '@mui/material';
import AppCard from '../../../components/cards/AppCard';
import { useNavigate } from 'react-router-dom';
import { ADMIN_URLs } from '../../../constants/admin-urls';
import { EditOutlined } from '@ant-design/icons';

const CompanyDetails = () => {
  const navigate = useNavigate();

  // Mock data - replace with API call later
  const companyInfo = {
    name: 'Công ty Du lịch ABC',
    foundedDate: '2010/01/01',
    address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    email: 'contact@abctravel.com',
    phone: '02812345678',
    status: 'active',
    description: 'Công ty chuyên tổ chức các tour du lịch trong và ngoài nước...',
    website: 'www.abctravel.com',
    taxCode: '0123456789',
    representative: 'Nguyễn Văn A',
    representativePosition: 'Giám đốc',
    businessType: 'Công ty TNHH',
    employeeCount: '50-100',
    image: 'https://caodang.fpt.edu.vn/wp-content/uploads/2024/05/Artboard-3.png'
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
          <Stack direction="row" justifyContent="space-between" alignItems="start">
            <Stack direction="row" spacing={3} alignItems="center">
              <Box
                component="img"
                src={companyInfo.image}
                alt={companyInfo.name}
                sx={{
                  width: 200,
                  height: 120,
                  borderRadius: 1,
                  objectFit: 'cover'
                }}
              />
              <Stack spacing={1}>
                <Typography variant="h4">{companyInfo.name}</Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={companyInfo.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                    color={companyInfo.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                  <Chip label={companyInfo.businessType} color="primary" size="small" />
                </Stack>
              </Stack>
            </Stack>
            <Button variant="contained" color="primary" startIcon={<EditOutlined />} onClick={() => navigate(ADMIN_URLs.COMPANY.UPDATE)}>
              Chỉnh sửa
            </Button>
          </Stack>

          <Divider />

          {/* Basic Information */}
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Thông tin cơ bản
            </Typography>
            <Stack spacing={1}>
              <InfoRow label="Tên công ty" value={companyInfo.name} />
              <InfoRow label="Loại hình doanh nghiệp" value={companyInfo.businessType} />
              <InfoRow label="Mã số thuế" value={companyInfo.taxCode} />
              <InfoRow label="Ngày thành lập" value={companyInfo.foundedDate} />
              <InfoRow label="Website" value={companyInfo.website} />
            </Stack>
          </Box>

          <Divider />

          {/* Contact Information */}
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Thông tin liên hệ
            </Typography>
            <Stack spacing={1}>
              <InfoRow label="Địa chỉ" value={companyInfo.address} />
              <InfoRow label="Email" value={companyInfo.email} />
              <InfoRow label="Số điện thoại" value={companyInfo.phone} />
            </Stack>
          </Box>

          <Divider />

          {/* Representative Information */}
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Người đại diện
            </Typography>
            <Stack spacing={1}>
              <InfoRow label="Họ và tên" value={companyInfo.representative} />
              <InfoRow label="Chức vụ" value={companyInfo.representativePosition} />
            </Stack>
          </Box>

          <Divider />

          {/* Additional Information */}
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Thông tin bổ sung
            </Typography>
            <Stack spacing={1}>
              <InfoRow label="Quy mô nhân sự" value={companyInfo.employeeCount} />
              <Grid container spacing={2} sx={{ py: 1 }}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle1" color="textSecondary">
                    Mô tả
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {companyInfo.description}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Stack>
      </AppCard>
    </Stack>
  );
};

export default CompanyDetails;
