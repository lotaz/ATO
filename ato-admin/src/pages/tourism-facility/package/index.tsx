import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
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
import { RootState } from '../../../redux/store';
import { fetchPackages } from '../../../redux/tourism-facility/package.slice';
import { NoDataDisplay } from '../../../components/no-data/NoDataDisplay';
import AppSearchBar from '../../../components/table/SearchBar';
import dayjs from 'dayjs';

const PackageList = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { packages } = useSelector((state: RootState) => state.packageSlice);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredPackages = packages?.filter(
    (pkg) =>
      pkg.packageName.toLowerCase().includes(searchText.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchText.toLowerCase())
  ) || [];

  const currentPackages = filteredPackages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <AppSearchBar placeholder="Tìm kiếm gói du lịch" onChange={(e) => setSearchText(e.target.value)} />
        <Button
          variant="contained"
          startIcon={<PlusOutlined />}
          onClick={() => navigate(TOURISM_FACILITY_URLs.PACKAGE.CREATE)}
        >
          Thêm gói du lịch
        </Button>
      </Stack>

      <Card>
        {currentPackages?.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên gói</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Thời gian (ngày)</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell align="right">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentPackages?.map((pkg) => (
                  <TableRow key={pkg.packageId}>
                    <TableCell>
                      <Typography
                        sx={{
                          maxWidth: 300,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {pkg.packageName}
                      </Typography>
                    </TableCell>
                    <TableCell>{pkg.price.toLocaleString('vi-VN')} VNĐ</TableCell>
                    <TableCell>{pkg.durations}</TableCell>
                    <TableCell>{dayjs(pkg.createdDate).format('DD/MM/YYYY')}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`${TOURISM_FACILITY_URLs.PACKAGE.DETAILS}?id=${pkg.packageId}`)}
                        >
                          <EyeOutlined />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => navigate(`${TOURISM_FACILITY_URLs.PACKAGE.UPDATE}?id=${pkg.packageId}`)}
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