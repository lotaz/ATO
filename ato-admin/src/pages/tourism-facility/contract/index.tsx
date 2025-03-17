import { EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
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
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { RootState } from '../../../redux/store';
import { fetchContracts } from '../../../redux/tourism-facility/contract.slice';
import AppSearchBar from '../../../components/table/SearchBar';

const ContractList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { list: contracts, loading } = useSelector((state: RootState) => state.contractSlice);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchContracts());
  }, [dispatch]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Add filtered contracts
  const filteredContracts = contracts.filter(
    (contract) =>
      contract.contractId.toString().includes(searchTerm) ||
      contract.company?.companynName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.discountRate.toString().includes(searchTerm)
  );

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <AppSearchBar placeholder="Tìm kiếm hợp đồng" onChange={(e) => setSearchTerm(e.target.value)} />
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate(TOURISM_FACILITY_URLs.CONTRACT.CREATE)}>
          Tạo hợp đồng mới
        </Button>
      </Stack>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã hợp đồng</TableCell>
                  <TableCell>Công ty du lịch</TableCell>
                  <TableCell>Chiết khấu</TableCell>
                  <TableCell>Ngày bắt đầu</TableCell>
                  <TableCell>Ngày kết thúc</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredContracts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contract) => (
                  <TableRow key={contract.contractId} hover>
                    <TableCell>{contract.contractId}</TableCell>
                    <TableCell>{contract.company?.companynName}</TableCell>
                    <TableCell>{contract.discountRate}%</TableCell>
                    <TableCell>{dayjs(contract.startDate).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{dayjs(contract.endDate).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>
                      <Chip
                        label={contract.signedDate ? 'Đã ký' : 'Chưa ký'}
                        color={contract.signedDate ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => navigate(`${TOURISM_FACILITY_URLs.CONTRACT.UPDATE}?id=${contract.contractId}`)}
                      >
                        <EditOutlined />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {loading && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Đang tải...
                    </TableCell>
                  </TableRow>
                )}
                {!loading && contracts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Chưa có hợp đồng nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredContracts.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50]}
            labelRowsPerPage="Số hàng mỗi trang:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
          />
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ContractList;
