import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { NoDataDisplay } from '../../../components/no-data/NoDataDisplay';
import AppSearchBar from '../../../components/table/SearchBar';
import dayjs from 'dayjs';
import { StatusApproval, StatusOperating, TimeType, TourismPackageResponse } from '../../../types/tourism-facility/package.types';
import { packageService } from '../../../services/tourism-facility/package.service';

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

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <AppSearchBar placeholder="Tìm kiếm gói du lịch" onChange={(e) => setSearchText(e.target.value)} />
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate(TOURISM_FACILITY_URLs.PACKAGE.CREATE)}>
          Thêm gói du lịch
        </Button>
      </Stack>

      <Card>
        {currentPackages.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên gói</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Thời gian</TableCell>
                  <TableCell>Trạng thái duyệt</TableCell>
                  <TableCell>Trạng thái hoạt động</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell align="right">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentPackages?.map((pkg) => (
                  <TableRow key={pkg.packageId}>
                    <TableCell>
                      <Typography sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {pkg.packageName}
                      </Typography>
                    </TableCell>
                    <TableCell>{pkg.price.toLocaleString('vi-VN')} VNĐ</TableCell>
                    <TableCell>
                      {pkg.durations} {getDurationType(pkg.durationsType)}
                    </TableCell>
                    <TableCell>
                      <Chip label={getStatusApprovalLabel(pkg.statusApproval)} size="small" color={getStatusColor(pkg.statusApproval)} />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getOperatingStatusLabel(pkg.statusOperating)}
                        size="small"
                        color={getOperatingStatusColor(pkg.statusOperating)}
                      />
                    </TableCell>
                    <TableCell>{dayjs(pkg.createDate).format('DD/MM/YYYY')}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`${TOURISM_FACILITY_URLs.PACKAGE.DETAILS.replace(':id', pkg?.packageId.toString())}`)}
                        >
                          <EyeOutlined />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => navigate(`${TOURISM_FACILITY_URLs.PACKAGE.UPDATE.replace(':id', pkg?.packageId.toString())}`)}
                        >
                          <EditOutlined />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={filteredPackages.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Số hàng mỗi trang:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
            />
          </TableContainer>
        ) : (
          <NoDataDisplay />
        )}
      </Card>
    </Stack>
  );
};

export default PackageList;
