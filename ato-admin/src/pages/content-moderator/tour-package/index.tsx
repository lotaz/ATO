// Update imports to include additional components
import { EyeOutlined, ClockCircleOutlined, DollarOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Card, CardContent, Chip, Grid, IconButton, MenuItem, Select, Stack, Typography, Box, Pagination } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppSearchBar from '../../../components/table/SearchBar';
import { CONTENT_MODERATOR_URLs } from '../../../constants/content-moderator-urls';
import { packageService } from '../../../services/content-moderator/package.service';
import { StatusApproval } from '../../../types/content-moderator/certification.types';
import { StatusOperating, TimeType, TourismPackageResponse } from '../../../types/tourism-facility/package.types';

const TourPackageList = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<TourismPackageResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusApproval | 'all'>(StatusApproval.Processing);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await packageService.getPackages();
      setPackages(response.data);
    } catch (error) {
      console.error('Failed to fetch packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPackages = packages
    .filter((pkg) => (statusFilter === 'all' ? true : pkg.statusApproval === statusFilter))
    .filter(
      (pkg) =>
        pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
      <Stack direction="row" gap={4} alignItems="center" mb={2}>
        <AppSearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
          sx={{ flex: 1, mr: 2 }}
        />
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusApproval | 'all')} sx={{ minWidth: 180 }}>
          <MenuItem value="all">Tất cả trạng thái</MenuItem>
          <MenuItem value={StatusApproval.Approved}>Đã duyệt</MenuItem>
          <MenuItem value={StatusApproval.Processing}>Đang xử lý</MenuItem>
          <MenuItem value={StatusApproval.Reject}>Từ chối</MenuItem>
          <MenuItem value={StatusApproval.Update}>Cần cập nhật</MenuItem>
        </Select>
      </Stack>

      {filteredPackages.length > 0 && (
        <>
          <Grid container spacing={0}>
            {filteredPackages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pkg) => (
              <Grid item xs={12} sm={6} md={4} key={pkg.packageId} sx={{ paddingRight: 2, paddingBottom: 2 }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Typography variant="h6" noWrap sx={{ maxWidth: '70%' }}>
                          {pkg.packageName}
                        </Typography>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => navigate(`${CONTENT_MODERATOR_URLs.PACKAGE.DETAILS}?id=${pkg.packageId}`)}
                        >
                          <EyeOutlined />
                        </IconButton>
                      </Stack>

                      {/* Add AFTO information after the package name */}
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <UserOutlined />
                        <Typography variant="body2" color="text.secondary">
                          {pkg.touristFacility?.touristFacilityName || 'Chưa có thông tin'}
                        </Typography>
                      </Stack>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          minHeight: '40px'
                        }}
                      >
                        {pkg.description || '-'}
                      </Typography>

                      <Stack spacing={1}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <DollarOutlined />
                          <Typography variant="body2">{formatCurrency(pkg.price)}</Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1}>
                          <ClockCircleOutlined />
                          <Typography variant="body2">{`${pkg.durations} ${getDurationType(pkg.durationsType)}`}</Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1}>
                          <CalendarOutlined />
                          <Typography variant="body2">{dayjs(pkg.createDate).format('DD/MM/YYYY HH:mm')}</Typography>
                        </Stack>
                      </Stack>

                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        <Chip
                          label={
                            pkg.statusApproval === StatusApproval.Approved
                              ? 'Đã duyệt'
                              : pkg.statusApproval === StatusApproval.Processing
                                ? 'Đang xử lý'
                                : pkg.statusApproval === StatusApproval.Reject
                                  ? 'Từ chối'
                                  : 'Cần cập nhật'
                          }
                          color={
                            pkg.statusApproval === StatusApproval.Approved
                              ? 'success'
                              : pkg.statusApproval === StatusApproval.Processing
                                ? 'warning'
                                : pkg.statusApproval === StatusApproval.Reject
                                  ? 'error'
                                  : 'info'
                          }
                          size="small"
                        />
                        <Chip
                          label={pkg.statusOperating === StatusOperating.ACTIVE ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                          color={pkg.statusOperating === StatusOperating.ACTIVE ? 'success' : 'error'}
                          size="small"
                        />
                        <Chip label={`${pkg.activities?.length || 0} hoạt động`} size="small" variant="outlined" />
                      </Stack>
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
      )}
      {filteredPackages.length === 0 && <Typography>Không tìm thấy gói du lịch cần duyệt</Typography>}
    </Stack>
  );
};

export default TourPackageList;
