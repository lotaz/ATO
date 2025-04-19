import { EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppSearchBar from '../../../components/table/SearchBar';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { agriculturalTourService } from '../../../services/tourism-company/agricultural-tour.service';
import { AgriculturalTourPackageResponse } from '../../../types/tourism-company/agricultural-tour.types';
import { TimeType } from '../../../types/tourism-facility/package.types';

const TourPackageList = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<AgriculturalTourPackageResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase()) || pkg.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
        <AppSearchBar
          fullWidth
          placeholder="Search by package name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_PACKAGE.CREATE)}>
          Tạo mới
        </Button>
      </Stack>

      <Card>
        <CardContent>
          <Stack spacing={2}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên chuyến</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Thời gian bắt đầu</TableCell>
                    <TableCell>Thời gian kết thúc</TableCell>
                    <TableCell>Thời lượng</TableCell>
                    <TableCell>Giá vé người lớn</TableCell>
                    <TableCell>Giá vé trẻ em</TableCell>
                    <TableCell>Tuổi áp dụng vé trẻ em</TableCell>
                    <TableCell>Số điểm đến</TableCell>
                    <TableCell>Số hướng dẫn viên</TableCell>
                    <TableCell align="center">Hành động</TableCell>
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
                      <TableCell>{formatCurrency(pkg.priceOfAdults)}</TableCell>
                      <TableCell>{formatCurrency(pkg.priceOfChildren)}</TableCell>
                      <TableCell>{pkg.childTicketAge}</TableCell>
                      <TableCell>{pkg.tourDestinations?.length || 0}</TableCell>
                      <TableCell>{pkg.tourGuides?.length || 0}</TableCell>
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
              labelRowsPerPage="Rows per page:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default TourPackageList;
