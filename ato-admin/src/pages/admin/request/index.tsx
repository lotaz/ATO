import { MessageOutlined } from '@ant-design/icons';
import {
  Box,
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

export interface RequestData {
  id: string;
  title: string;
  sender: string;
  date: string;
  status: 'pending' | 'replied' | 'closed';
  priority: 'high' | 'medium' | 'low';
}

export interface RequestTableColumn {
  id: keyof RequestData;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}

const columns: RequestTableColumn[] = [
  { id: 'id', label: 'Mã YC', minWidth: 100 },
  { id: 'title', label: 'Tiêu đề', minWidth: 200 },
  { id: 'sender', label: 'Người gửi', minWidth: 150 },
  { id: 'date', label: 'Ngày gửi', minWidth: 150 },
  {
    id: 'priority',
    label: 'Độ ưu tiên',
    minWidth: 100,
    format: (value: string) => {
      switch (value) {
        case 'high':
          return 'Cao';
        case 'medium':
          return 'Trung bình';
        case 'low':
          return 'Thấp';
        default:
          return value;
      }
    }
  },
  {
    id: 'status',
    label: 'Trạng thái',
    minWidth: 100,
    format: (value: string) => {
      switch (value) {
        case 'pending':
          return 'Chờ xử lý';
        case 'replied':
          return 'Đã trả lời';
        case 'closed':
          return 'Đã đóng';
        default:
          return value;
      }
    }
  }
];

const sampleRequests: RequestData[] = [
  {
    id: 'YC-001',
    title: 'Vấn đề truy cập tài khoản',
    sender: 'nguyen.van.a@company.com',
    date: '20/02/2024',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'YC-002',
    title: 'Yêu cầu đặt lại mật khẩu',
    sender: 'tran.thi.b@company.com',
    date: '19/02/2024',
    status: 'replied',
    priority: 'medium'
  },
  {
    id: 'YC-003',
    title: 'Thắc mắc về nâng cấp dịch vụ',
    sender: 'le.van.c@company.com',
    date: '18/02/2024',
    status: 'pending',
    priority: 'low'
  },
  {
    id: 'YC-004',
    title: 'Sai sót trong hóa đơn',
    sender: 'pham.thi.d@company.com',
    date: '17/02/2024',
    status: 'closed',
    priority: 'high'
  },
  {
    id: 'YC-005',
    title: 'Cần hỗ trợ kỹ thuật',
    sender: 'hoang.van.e@company.com',
    date: '16/02/2024',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 'YC-006',
    title: 'Đề xuất tính năng mới',
    sender: 'nguyen.thi.f@company.com',
    date: '15/02/2024',
    status: 'replied',
    priority: 'low'
  },
  {
    id: 'YC-007',
    title: 'Báo cáo sự cố dịch vụ',
    sender: 'tran.van.g@company.com',
    date: '14/02/2024',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'YC-008',
    title: 'Xác minh tài khoản',
    sender: 'le.thi.h@company.com',
    date: '13/02/2024',
    status: 'closed',
    priority: 'medium'
  },
  {
    id: 'YC-009',
    title: 'Yêu cầu xuất dữ liệu',
    sender: 'pham.van.i@company.com',
    date: '12/02/2024',
    status: 'replied',
    priority: 'low'
  },
  {
    id: 'YC-010',
    title: 'Vấn đề bảo mật',
    sender: 'hoang.thi.k@company.com',
    date: '11/02/2024',
    status: 'pending',
    priority: 'high'
  }
];

const Index = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState<RequestData[]>(sampleRequests);
  const navigate = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleReply = (requestId: string) => {
    navigate(`${ADMIN_URLs.REQUEST.REPLY}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'replied':
        return 'success';
      case 'closed':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Stack spacing={2}>
      <Box>
        <AppSearchBar placeholder="Tìm kếm yêu cầu" />
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table>
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
                  Hành động
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
                          <Chip label={value} color={getStatusColor(value)} size="small" />
                        ) : column.id === 'priority' ? (
                          <Chip label={value} color={getPriorityColor(value)} size="small" />
                        ) : column.format ? (
                          column.format(value)
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center" sx={{ width: '120px' }}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<MessageOutlined />}
                      onClick={() => handleReply(row.id)}
                      disabled={row.status === 'closed'}
                    >
                      Phản hồi
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

export default Index;
