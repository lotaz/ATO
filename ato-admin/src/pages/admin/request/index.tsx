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
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppSearchBar from '../../../components/table/SearchBar';
import { ADMIN_URLs } from '../../../constants/admin-urls';
import { IssueType, IssueTypeLabels, UserSupport } from '../../../types/admin/support.types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSupports } from '../../../redux/admin/support.slice';
import { RootState } from '../../../redux/store';

interface RequestTableColumn {
  id: keyof UserSupport;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}

const columns: RequestTableColumn[] = [
  { id: 'supportId', label: 'Mã YC', minWidth: 100 },
  { id: 'issueType', label: 'Loại yêu cầu', minWidth: 150, format: (value: IssueType) => IssueTypeLabels[value] },
  { id: 'fullname', label: 'Người gửi', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'requestDate', label: 'Ngày gửi', minWidth: 120, format: (value: string) => dayjs(value).format('DD/MM/YYYY HH:mm') },
  { id: 'isResolved', label: 'Trạng thái', minWidth: 100 }
];

const Index = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Replace with actual API call
  const [rows, setRows] = useState<UserSupport[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleReply = (supportId: string) => {
    navigate(`${ADMIN_URLs.REQUEST.REPLY}?id=${supportId}`);
  };

  const getStatusColor = (isResolved: boolean) => {
    return isResolved ? 'success' : 'warning';
  };

  const getStatusLabel = (isResolved: boolean) => {
    return isResolved ? 'Đã xử lý' : 'Chờ xử lý';
  };

  const dispatch = useDispatch<any>();
  const { supports, loading } = useSelector((state: RootState) => state.supportSlice);

  useEffect(() => {
    dispatch(fetchUserSupports());
  }, [dispatch]);

  // Replace the rows state with the API data
  const filteredRows = supports.filter((row) =>
    Object.values(row).some((value) => 
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack spacing={2}>
      <Box>
        <AppSearchBar placeholder="Tìm kiếm yêu cầu" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 400 }}>
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
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow hover key={row.supportId}>
                  <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'isResolved' ? (
                          <Chip label={getStatusLabel(value as boolean)} color={getStatusColor(value as boolean)} size="small" />
                        ) : column.format ? (
                          column.format(value)
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<MessageOutlined />}
                      onClick={() => handleReply(row.supportId)}
                      disabled={row.isResolved}
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
