import { EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Chip, IconButton, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoDataDisplay } from '../../../components/no-data/NoDataDisplay';
import AppSearchBar from '../../../components/table/SearchBar';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { packageService } from '../../../services/tourism-facility/package.service';
import { StatusApproval, StatusOperating, TimeType, TourismPackageResponse } from '../../../types/tourism-facility/package.types';

import { CalendarOutlined, ClockCircleOutlined, DollarOutlined } from '@ant-design/icons';
import { Box, CardContent, CardMedia, Grid, Pagination } from '@mui/material';

const getDurationType = (type: TimeType) => {
  const types = {
    [TimeType.SECOND]: 'Giây',
    [TimeType.MINUTE]: 'Phút',
    [TimeType.HOUR]: 'Giờ',
    [TimeType.DAY]: 'Ngày',
    [TimeType.MONTH]: 'Tháng',
    [TimeType.YEAR]: 'Năm'
  };
  return types[type] || 'Không xác định';
};

const getStatusApprovalLabel = (status: StatusApproval) => {
  const labels = {
    [StatusApproval.APPROVED]: 'Đã duyệt',
    [StatusApproval.PROCESSING]: 'Đang xử lý',
    [StatusApproval.REJECT]: 'Từ chối',
    [StatusApproval.UPDATE]: 'Cập nhật'
  };
  return labels[status] || 'Không xác định';
};

const getStatusColor = (status: StatusApproval) => {
  const colors = {
    [StatusApproval.APPROVED]: 'success',
    [StatusApproval.PROCESSING]: 'warning',
    [StatusApproval.REJECT]: 'error',
    [StatusApproval.UPDATE]: 'info'
  };
  return colors[status] || 'default';
};

const getOperatingStatusLabel = (status: StatusOperating) => {
  return status === StatusOperating.ACTIVE ? 'Hoạt động' : 'Không hoạt động';
};

const getOperatingStatusColor = (status: StatusOperating) => {
  return status === StatusOperating.ACTIVE ? 'success' : 'error';
};

const PackageList = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<TourismPackageResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setIsLoading(true);
      const response = await packageService.getPackages();
      console.log(response.data);

      setPackages(response.data);
    } catch (error) {
      console.error('Failed to fetch packages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.packageName.toLowerCase().includes(searchText.toLowerCase()) ||
      (pkg.description?.toLowerCase() || '').includes(searchText.toLowerCase())
  );

  const currentPackages = filteredPackages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (isLoading) {
    return <Typography>Đang tải...</Typography>;
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <AppSearchBar placeholder="Tìm kiếm gói du lịch" onChange={(e) => setSearchText(e.target.value)} />
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate(TOURISM_FACILITY_URLs.PACKAGE.CREATE)}>
          Thêm gói du lịch
        </Button>
      </Stack>

      {isLoading ? (
        <Typography>Đang tải...</Typography>
      ) : currentPackages.length > 0 ? (
        <>
          <Grid container spacing={0}>
            {currentPackages.map((pkg) => (
              <Grid sx={{ paddingRight: 2, paddingBottom: 2 }} item xs={12} sm={6} md={3} key={pkg.packageId}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: 6,
                      transition: 'all 0.3s ease-in-out',
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      noWrap
                      title={pkg.packageName}
                      sx={{
                        borderBottom: '2px solid',
                        borderColor: 'primary.main',
                        pb: 1,
                        mb: 2
                      }}
                    >
                      {pkg.packageName}
                    </Typography>

                    <Stack spacing={2} sx={{ flex: 1 }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <DollarOutlined style={{ color: '#666' }} />
                        <Typography>{pkg.price.toLocaleString('vi-VN')} VNĐ</Typography>
                      </Stack>

                      <Stack direction="row" alignItems="center" spacing={1}>
                        <ClockCircleOutlined style={{ color: '#666' }} />
                        <Typography>
                          {pkg.durations} {getDurationType(pkg.durationsType)}
                        </Typography>
                      </Stack>

                      <Stack direction="row" alignItems="center" spacing={1}>
                        <CalendarOutlined style={{ color: '#666' }} />
                        <Typography>{dayjs(pkg.createDate).format('DD/MM/YYYY')}</Typography>
                      </Stack>

                      <Stack direction="row" spacing={1}>
                        <Chip label={getStatusApprovalLabel(pkg.statusApproval)} size="small" color={getStatusColor(pkg.statusApproval)} />
                        <Chip
                          label={getOperatingStatusLabel(pkg.statusOperating)}
                          size="small"
                          color={getOperatingStatusColor(pkg.statusOperating)}
                        />
                      </Stack>

                      {pkg.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}
                        >
                          {pkg.description}
                        </Typography>
                      )}
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                      sx={{
                        mt: 2,
                        pt: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => navigate(`${TOURISM_FACILITY_URLs.PACKAGE.DETAILS.replace(':id', pkg.packageId.toString())}`)}
                        sx={{
                          color: 'info.main',
                          '&:hover': { bgcolor: 'info.lighter' }
                        }}
                      >
                        <EyeOutlined />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => navigate(`${TOURISM_FACILITY_URLs.PACKAGE.UPDATE.replace(':id', pkg.packageId.toString())}`)}
                        sx={{
                          color: 'warning.main',
                          '&:hover': { bgcolor: 'warning.lighter' }
                        }}
                      >
                        <EditOutlined />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(filteredPackages.length / rowsPerPage)}
              page={page + 1}
              onChange={(_, newPage) => setPage(newPage - 1)}
              color="primary"
            />
          </Box>
        </>
      ) : (
        <NoDataDisplay />
      )}
    </Stack>
  );
};

export default PackageList;
