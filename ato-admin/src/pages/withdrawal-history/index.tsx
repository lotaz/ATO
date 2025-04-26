import {
  Box,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Stack } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WITHDRAWAL_URLs } from '../../constants/withdrawal-history-urls';
import { get } from '../../helpers/axios-helper';

interface WithdrawalHistory {
  withdrawalId: string;
  amount: number;
  transactionReference?: string;
  processedDate: string;
  note?: string;
  transactionImage?: string;
  withdrawalStatus: string;
  tourCompanyId?: string;
  touristFacilityId?: string;
  tourCompany: {
    companynName: string;
  };
  touristFacility: {
    touristFacilityName: string;
  };
}

const WithdrawalHistory = () => {
  const navigate = useNavigate();
  const [withdrawals, setWithdrawals] = useState<WithdrawalHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [statusFilter, setStatusFilter] = useState<'all' | number>('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchWithdrawals = async () => {
    try {
      const response = await get('/withdrawl');
      setWithdrawals(response.data);
    } catch (error) {
      console.error('Failed to fetch withdrawals:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
  };

  const getWithdrawalStatusText = (status: number) => {
    switch (status) {
      case 0:
        return 'Mới';
      case 1:
        return 'Đang xử lý';
      case 2:
        return 'Hoàn thành';
      case 3:
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  const getWithdrawalStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return 'default';
      case 1:
        return 'primary';
      case 2:
        return 'success';
      case 3:
        return 'error';
      default:
        return 'default';
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (withdrawalId: string) => {
    navigate(`${WITHDRAWAL_URLs.DETAILS}?id=${withdrawalId}`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  const filteredWithdrawals = withdrawals.filter((withdrawal) => {
    const statusType = statusFilter === 'all' ? true : withdrawal.withdrawalStatus === statusFilter;
    let dateType = false;
    if (selectedDate) {
      console.log('selectedDate', selectedDate);
      const processedDate = new Date(withdrawal.processedDate);
      const selectedMonth = selectedDate.month(); // Use dayjs month() method
      const selectedYear = selectedDate.year(); // Use dayjs year() method

      dateType = processedDate.getMonth() === selectedMonth && processedDate.getFullYear() === selectedYear;
    }

    return statusType && dateType;
  });

  return (
    <Box>
      <Stack direction={'row'} sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Trạng thái</InputLabel>
          <Select
            sx={{ backgroundColor: 'white' }}
            value={statusFilter}
            label="Trạng thái"
            onChange={(e) => setStatusFilter(e.target.value as 'all' | number)}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value={0}>Mới</MenuItem>
            <MenuItem value={1}>Đang xử lý</MenuItem>
            <MenuItem value={2}>Hoàn thành</MenuItem>
            <MenuItem value={3}>Đã hủy</MenuItem>
          </Select>
        </FormControl>
        <DatePicker
          views={['month', 'year']}
          label="Chọn tháng/năm"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          sx={{ backgroundColor: 'white' }}
        />
      </Stack>

      <Paper>
        <TableContainer>
          {filteredWithdrawals.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
                textAlign: 'center',
                p: 4
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Không có dữ liệu
              </Typography>
            </Box>
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ngày xử lý</TableCell>
                    <TableCell>Số tiền</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell>Mã giao dịch</TableCell>
                    <TableCell>Ghi chú</TableCell>
                    <TableCell>Đối tượng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredWithdrawals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((withdrawal) => (
                    <TableRow
                      key={withdrawal.withdrawalId}
                      hover
                      onClick={() => handleRowClick(withdrawal.withdrawalId)}
                      style={{ cursor: 'pointer' }}
                    >
                      <TableCell>{formatDate(withdrawal.processedDate)}</TableCell>
                      <TableCell>{formatCurrency(withdrawal.amount)}</TableCell>
                      <TableCell>
                        <Chip
                          label={getWithdrawalStatusText(withdrawal.withdrawalStatus)}
                          color={getWithdrawalStatusColor(withdrawal.withdrawalStatus)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{withdrawal.transactionReference || 'N/A'}</TableCell>
                      <TableCell>{withdrawal.note || 'N/A'}</TableCell>
                      <TableCell>
                        {withdrawal.tourCompany?.companynName || withdrawal.touristFacility?.touristFacilityName || 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={filteredWithdrawals.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Số dòng mỗi trang:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} trong ${count}`}
              />
            </>
          )}
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default WithdrawalHistory;
