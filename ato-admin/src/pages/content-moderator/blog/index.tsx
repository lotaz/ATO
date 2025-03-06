import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppSearchBar from '../../../components/table/SearchBar';
import { ADMIN_URLs } from '../../../constants/admin-urls';
import { CONTENT_MODERATOR_URLs } from '../../../constants/content-moderator-urls';

interface NewsData {
  id: string;
  title: string;
  category: string;
  author: string;
  publishDate: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
}

interface NewsTableColumn {
  id: keyof NewsData;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string | number;
}

const columns: NewsTableColumn[] = [
  { id: 'id', label: 'Mã tin', minWidth: 100 },
  { id: 'title', label: 'Tiêu đề', minWidth: 200 },
  { id: 'category', label: 'Danh mục', minWidth: 150 },
  { id: 'author', label: 'Tác giả', minWidth: 150 },
  { id: 'publishDate', label: 'Ngày đăng', minWidth: 130 },
  { id: 'views', label: 'Lượt xem', minWidth: 100, align: 'right' },
  { id: 'status', label: 'Trạng thái', minWidth: 120 }
];

// Sample data
const sampleNews: NewsData[] = [
  {
    id: 'TT-001',
    title: 'Du lịch Hạ Long mùa thu',
    category: 'Du lịch trong nước',
    author: 'Nguyễn Văn A',
    publishDate: '20/02/2024',
    status: 'published',
    views: 1250
  },
  {
    id: 'TT-002',
    title: 'Top 10 nhà hàng đẹp tại Đà Nẵng',
    category: 'Ẩm thực',
    author: 'Trần Thị B',
    publishDate: '19/02/2024',
    status: 'published',
    views: 890
  },
  {
    id: 'TT-003',
    title: 'Kinh nghiệm du lịch Phú Quốc',
    category: 'Du lịch trong nước',
    author: 'Lê Văn C',
    publishDate: '18/02/2024',
    status: 'draft',
    views: 0
  }
  // Add more sample data as needed
];

const Blog = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [rows] = useState<NewsData[]>(sampleNews);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'warning';
      case 'archived':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Đã đăng';
      case 'draft':
        return 'Bản nháp';
      case 'archived':
        return 'Đã lưu trữ';
      default:
        return status;
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`${CONTENT_MODERATOR_URLs.BLOG.DETAILS}?id=${id}`);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <AppSearchBar placeholder="Tìm kiếm tin tức" />
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlusOutlined />}
          onClick={() => navigate(CONTENT_MODERATOR_URLs.BLOG.CREATE)}
        >
          Thêm mới
        </Button>
      </Stack>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ width: 20 }}>
                  #
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="center" style={{ width: 100 }}>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow hover key={row.id}>
                  <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'status' ? (
                          <Chip label={getStatusText(value as string)} color={getStatusColor(value as string)} size="small" />
                        ) : column.format ? (
                          column.format(value)
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center" sx={{ width: 120 }}>
                    <Button variant="outlined" size="small" startIcon={<EyeOutlined />} onClick={() => handleViewDetails(row.id)}>
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
          count={filteredRows.length}
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

export default Blog;
