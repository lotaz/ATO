import {
  Box,
  Button,
  Chip,
  Paper,
  Rating,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppSearchBar from '../../../components/table/SearchBar';
import { CONTENT_MODERATOR_URLs } from '../../../constants/content-moderator-urls';
import { Review } from './types';

const Index = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - thay thế bằng API call
  const reviews: Review[] = [
    {
      id: 'RV001',
      type: 'system',
      userId: 'U001',
      userName: 'Nguyễn Văn A',
      userEmail: 'nguyenvana@gmail.com',
      rating: 4,
      comment: 'Hệ thống dễ sử dụng, tìm kiếm nhanh chóng',
      createdAt: '20/02/2024',
      status: 'pending'
    },
    {
      id: 'RV002',
      type: 'company',
      userId: 'U002',
      userName: 'Trần Thị B',
      userEmail: 'tranthib@gmail.com',
      rating: 5,
      comment: 'Tour du lịch rất tốt, hướng dẫn viên nhiệt tình',
      createdAt: '19/02/2024',
      status: 'approved',
      companyId: 'C001',
      companyName: 'Công ty Du lịch ABC'
    }
    // Thêm dữ liệu mẫu khác...
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Đã duyệt';
      case 'rejected':
        return 'Từ chối';
      case 'pending':
        return 'Chờ duyệt';
      default:
        return status;
    }
  };

  const filteredReviews = reviews
    .filter((review) => review.type === (tab === 0 ? 'system' : 'company'))
    .filter((review) => Object.values(review).some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())));

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <AppSearchBar placeholder="Tìm kiếm đánh giá..." onChange={(e) => setSearchTerm(e.target.value)} />
      </Stack>

      <Paper>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChangeTab}>
            <Tab label="Đánh giá hệ thống" />
            <Tab label="Đánh giá công ty du lịch" />
          </Tabs>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Người đánh giá</TableCell>
                {tab === 1 && <TableCell>Công ty</TableCell>}
                <TableCell>Đánh giá</TableCell>
                <TableCell>Nội dung</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReviews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.id}</TableCell>
                  <TableCell>
                    <Stack>
                      <span>{review.userName}</span>
                      <span style={{ color: 'gray', fontSize: '0.875rem' }}>{review.userEmail}</span>
                    </Stack>
                  </TableCell>
                  {tab === 1 && <TableCell>{review.companyName}</TableCell>}
                  <TableCell>
                    <Rating value={review.rating} readOnly size="small" />
                  </TableCell>
                  <TableCell>
                    <div style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {review.comment}
                    </div>
                  </TableCell>
                  <TableCell>{review.createdAt}</TableCell>
                  <TableCell>
                    <Chip label={getStatusText(review.status)} color={getStatusColor(review.status)} size="small" />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`${CONTENT_MODERATOR_URLs.REVIEW.DETAILS}?id=${review.id}`)}
                    >
                      Chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredReviews.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
        />
      </Paper>
    </Stack>
  );
};

export default Index;
