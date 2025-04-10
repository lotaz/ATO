import { Button, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppSearchBar from '../../../components/table/SearchBar';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { tourGuideService } from '../../../services/tourism-company/tour-guide.service';
import { TourGuideResponse } from '../../../types/tourism-company/tour-guide.types';
import { TablePagination } from '@mui/material';

const TourGuideList = () => {
  const navigate = useNavigate();
  const [tourGuides, setTourGuides] = useState<TourGuideResponse[]>([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchTourGuides();
  }, []);

  const fetchTourGuides = async () => {
    try {
      const response = await tourGuideService.getTourGuides();
      console.log('response', response.data);
      setTourGuides(response.data);
    } catch (error) {
      console.error('Failed to fetch tour guides:', error);
    } finally {
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredData = tourGuides.filter((item: TourGuideResponse) => {
    const searchLower = searchText.toLowerCase();
    return (
      item?.account?.fullname?.toLowerCase().includes(searchLower) ||
      item?.account?.email?.toLowerCase().includes(searchLower) ||
      item.expertiseArea?.toLowerCase().includes(searchLower) ||
      item.languages?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <AppSearchBar onChange={(e) => handleSearch(e.target.value)} placeholder="Tìm kiếm hướng dẫn viên" />
        <Button variant="contained" onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.CREATE)}>
          Thêm Hướng Dẫn Viên
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Họ tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Ngôn ngữ</TableCell>
              <TableCell>Chuyên môn</TableCell>
              <TableCell align="right">Đánh giá</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((guide) => (
              <TableRow key={guide.guideId}>
                <TableCell>{guide?.account?.fullname || '-'}</TableCell>
                <TableCell>{guide?.account?.email || '-'}</TableCell>
                <TableCell>{guide?.account?.phoneNumber || '-'}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {guide.languages?.split(',').map((lang) => <Chip key={lang.trim()} label={lang.trim()} size="small" />)}
                  </Stack>
                </TableCell>
                <TableCell>{guide.expertiseArea || '-'}</TableCell>
                <TableCell align="right">{guide.rating?.toFixed(1) || '-'}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" onClick={() => navigate(`${TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.DETAILS}?id=${guide.guideId}`)}>
                      Chi tiết
                    </Button>
                    <Button size="small" onClick={() => navigate(`${TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.UPDATE}?id=${guide.guideId}`)}>
                      Cập nhật
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
        />
      </TableContainer>
    </Stack>
  );
};

export default TourGuideList;
