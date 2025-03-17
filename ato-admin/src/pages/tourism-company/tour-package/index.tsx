import { EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { RootState } from '../../../redux/store';
import { fetchTourPackages } from '../../../redux/tourism-company/tour-package.slice';
import { DurationType } from '../../../types/tourism-company/tour-package.types';
import AppSearchBar from '../../../components/table/SearchBar';

const TourPackageList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { list: packages } = useSelector((state: RootState) => state.tourPackageSlice);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchTourPackages());
  }, [dispatch]);

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase()) || pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDurationType = (type: DurationType) => {
    switch (type) {
      case DurationType.HOURS:
        return 'Giờ';
      case DurationType.DAYS:
        return 'Ngày';
      case DurationType.WEEKS:
        return 'Tuần';
      case DurationType.MONTHS:
        return 'Tháng';
      default:
        return '';
    }
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <AppSearchBar
          fullWidth
          placeholder="Tìm kiếm theo tên gói hoặc mô tả..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_PACKAGE.CREATE)}>
          Thêm gói du lịch
        </Button>
      </Stack>

      <Card>
        <CardContent>
          <Stack spacing={2}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên gói</TableCell>
                    <TableCell>Số chỗ</TableCell>
                    <TableCell>Thời gian bắt đầu</TableCell>
                    <TableCell>Thời gian kết thúc</TableCell>
                    <TableCell>Thời lượng</TableCell>
                    <TableCell>Giá</TableCell>
                    <TableCell align="center">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPackages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pkg) => (
                    <TableRow key={pkg.tourId} hover>
                      <TableCell>{pkg.packageName}</TableCell>
                      <TableCell>{pkg.slot}</TableCell>
                      <TableCell>{dayjs(pkg.startTime).format('DD/MM/YYYY HH:mm')}</TableCell>
                      <TableCell>{dayjs(pkg.endTime).format('DD/MM/YYYY HH:mm')}</TableCell>
                      <TableCell>{`${pkg.durations} ${getDurationType(pkg.durationsType)}`}</TableCell>
                      <TableCell>{pkg.price.toLocaleString('vi-VN')} đ</TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <IconButton
                            color="primary"
                            onClick={() => navigate(`${TOURISM_COMPANY_URLs.TOUR_PACKAGE.DETAILS}?id=${pkg.tourId}`)}
                          >
                            <EyeOutlined />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => navigate(`${TOURISM_COMPANY_URLs.TOUR_PACKAGE.UPDATE}?id=${pkg.tourId}`)}
                          >
                            <EditOutlined />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={filteredPackages.length}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[10, 25, 50]}
              labelRowsPerPage="Số hàng mỗi trang:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default TourPackageList;
