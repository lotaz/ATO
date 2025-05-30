import {
  Box,
  Button,
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
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../../../helpers/axios-helper';
import { ADMIN_URLs } from '../../../constants/admin-urls';

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

const PaymentHistory = () => {
  const navigate = useNavigate();
  const [withdrawals, setWithdrawals] = useState<WithdrawalHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'company' | 'facility'>('all');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [statusFilter, setStatusFilter] = useState<'all' | number>('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleGenerateMonthlyWithdrawals = async () => {
    try {
      const response = await get('/admin/withdrawals/generate-monthly');
      if (response.data.status) {
        enqueueSnackbar(response.data.message, { variant: 'success' });

        // Refresh the data
        fetchWithdrawals();
      } else {
        enqueueSnackbar(response.data.message, { variant: 'error' });
      }
    } catch (error) {
      console.error('Failed to generate monthly withdrawals:', error);
      enqueueSnackbar('Có lỗi xảy ra khi tạo yêu cầu hoàn tiền', { variant: 'error' });
    }
  };
  const fetchWithdrawals = async () => {
    try {
      const response = await get('/admin/withdrawals');
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
    navigate(`${ADMIN_URLs.PAYMENTHISTORY.DETAILS}?id=${withdrawalId}`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  const filteredWithdrawals = withdrawals?.filter((withdrawal) => {
    const statusType = statusFilter === 'all' ? true : withdrawal.withdrawalStatus === statusFilter;
    let dateType = false;
    if (selectedDate) {
      console.log('selectedDate', selectedDate);
      const processedDate = new Date(withdrawal.processedDate);
      const selectedMonth = selectedDate.month(); // Use dayjs month() method
      const selectedYear = selectedDate.year(); // Use dayjs year() method

      dateType = processedDate.getMonth() === selectedMonth && processedDate.getFullYear() === selectedYear;
    }

    // Type filter
    if (filterType === 'all') return statusType && dateType;
    if (filterType === 'company') {
      return !!withdrawal.tourCompanyId && statusType && dateType;
    }
    if (filterType === 'facility') {
      return !!withdrawal.touristFacilityId && statusType && dateType;
    }

    return true;
  });

  return (
    <Box>
      <Stack direction={'row'} sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Loại đối tượng</InputLabel>
          <Select
            sx={{ backgroundColor: 'white' }}
            value={filterType}
            label="Loại đối tượng"
            onChange={(e) => setFilterType(e.target.value as 'all' | 'company' | 'facility')}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="company">Công ty du lịch</MenuItem>
            <MenuItem value="facility">Cơ sở du lịch</MenuItem>
          </Select>
        </FormControl>
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

        <Button variant="contained" color="primary" onClick={handleGenerateMonthlyWithdrawals} sx={{ ml: 'auto' }}>
          Tạo yêu cầu giải ngân tháng này
        </Button>
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
                Không có yêu cầu rút tiền nào
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Hiện tại không có yêu cầu rút tiền nào được ghi nhận
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

export default PaymentHistory;
