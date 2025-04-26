import {
  CalendarOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  TeamOutlined,
  CompassOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Box, Button, Card, CardContent, Chip, Grid, IconButton, Pagination, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppSearchBar from '../../../components/table/SearchBar';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { agriculturalTourService } from '../../../services/tourism-company/agricultural-tour.service';
import { AgriculturalTourPackageResponse } from '../../../types/tourism-company/agricultural-tour.types';
import { TimeType } from '../../../types/tourism-facility/package.types';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const TourPackageList = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<AgriculturalTourPackageResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, _] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'active' | 'inactive' | 'all'>('active');

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await agriculturalTourService.getPackages();
      setPackages(response.data);
    } catch (error) {
      console.error('Failed to fetch packages:', error);
    } finally {
      setLoading(false);
    }
  };

  console.log('packages', packages);

  const filteredPackages = packages.filter(
    (pkg) =>
      (pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' ||
        (statusFilter === 'active' && pkg.statusActive === 0) ||
        (statusFilter === 'inactive' && pkg.statusActive === 1))
  );

  const getDurationType = (type: TimeType) => {
    const types = {
      [TimeType.SECOND]: 'Giây',
      [TimeType.MINUTE]: 'Phút',
      [TimeType.HOUR]: 'Giờ',
      [TimeType.DAY]: 'Ngày',
      [TimeType.MONTH]: 'Tháng',
      [TimeType.YEAR]: 'Nằm'
    };
    return types[type] || 'Undefined';
  };
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={3}>
          <AppSearchBar
            fullWidth
            placeholder="Search by package name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={statusFilter}
              label="Trạng thái"
              onChange={(e) => setStatusFilter(e.target.value as 'active' | 'inactive' | 'all')}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="active">Đang hoạt động</MenuItem>
              <MenuItem value="inactive">Ngừng hoạt động</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_PACKAGE.CREATE)}>
            Tạo mới
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={0}>
        {filteredPackages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pkg) => (
          <Grid sx={{ paddingRight: 2, paddingBottom: 2 }} item xs={12} sm={6} md={4} lg={3} key={pkg.tourId}>
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
              {pkg.imgs && pkg.imgs.length > 0 ? (
                // Reduce image height
                <Box
                  sx={{
                    height: 160, // Reduced from 200
                    position: 'relative',
                    '& img': {
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }
                  }}
                >
                  <img src={pkg.imgs[0]} alt={pkg.packageName} />
                </Box>
              ) : (
                <Box
                  sx={{
                    height: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'primary.lighter',
                    color: 'primary.main'
                  }}
                >
                  <CompassOutlined style={{ fontSize: 64 }} />
                </Box>
              )}
              <CardContent
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '12px', // Reduced from default
                  '&:last-child': { paddingBottom: '12px' } // Override MUI default
                }}
              >
                <Typography
                  variant="subtitle1" // Changed from h6 to smaller variant
                  gutterBottom
                  noWrap
                  title={pkg.packageName}
                  sx={{
                    borderBottom: '1px solid', // Reduced border thickness
                    borderColor: 'primary.main',
                    pb: 0.5, // Reduced padding
                    mb: 1 // Reduced margin
                  }}
                >
                  {pkg.packageName}
                </Typography>

                <Stack spacing={1}>
                  {' '}
                  {/* Reduced spacing from 2 */}
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <TeamOutlined style={{ color: '#666' }} />
                    <Typography>{`Số lượng: ${pkg.slot} người`}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CalendarOutlined style={{ color: '#666' }} />
                    <Box>
                      <Typography variant="body2">Bắt đầu: {dayjs(pkg.startTime).format('DD/MM/YYYY HH:mm')}</Typography>
                      <Typography variant="body2">Kết thúc: {dayjs(pkg.endTime).format('DD/MM/YYYY HH:mm')}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ClockCircleOutlined style={{ color: '#666' }} />
                    <Typography>{`${pkg.durations} ${getDurationType(pkg.durationsType)}`}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <DollarOutlined style={{ color: '#666' }} />
                    <Box>
                      <Typography variant="body2">Người lớn: {formatCurrency(pkg.priceOfAdults)}</Typography>
                      <Typography variant="body2">Trẻ em: {formatCurrency(pkg.priceOfChildren)}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        (Áp dụng cho trẻ {pkg.childTicketAge} tuổi)
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Chip icon={<CompassOutlined />} label={`${pkg.tourDestinations?.length || 0} điểm đến`} size="small" color="primary" />
                    <Chip icon={<UserOutlined />} label={`${pkg.tourGuides?.length || 0} hướng dẫn viên`} size="small" color="info" />
                  </Stack>
                  <Chip
                    label={pkg.statusActive === 0 ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                    size="small"
                    color={pkg.statusActive === 0 ? 'success' : 'error'}
                  />
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="flex-end"
                  sx={{
                    mt: 1, // Reduced from 2
                    pt: 1, // Reduced from 2
                    borderTop: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => navigate(`${TOURISM_COMPANY_URLs.TOUR_PACKAGE.DETAILS}?id=${pkg.tourId}`)}
                    sx={{
                      color: 'info.main',
                      '&:hover': { bgcolor: 'info.lighter' }
                    }}
                  >
                    <EyeOutlined />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => navigate(`${TOURISM_COMPANY_URLs.TOUR_PACKAGE.UPDATE}?id=${pkg.tourId}`)}
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
    </Stack>
  );
};

export default TourPackageList;
