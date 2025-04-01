import { EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Chip,
  IconButton,
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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { NoDataDisplay } from '../../../../components/no-data/NoDataDisplay';
import AppSearchBar from '../../../../components/table/SearchBar';
import { TOURISM_FACILITY_URLs } from '../../../../constants/tourism-facility-urls';
import { RootState } from '../../../../redux/store';

const CertificateList = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const productId = params.get('productId');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');

  // TODO: Add certificates to redux store and create necessary actions
  const { certificates } = useSelector((state: RootState) => state.certificateSlice);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredCertificates =
    certificates?.filter(
      (cert) =>
        cert?.certificationName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
        cert?.issuingOrganization?.toLowerCase()?.includes(searchText?.toLowerCase())
    ) || [];

  const currentCertificates = filteredCertificates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
    if (productId) {
      // TODO: Add fetch certificates action
      // dispatch(fetchCertificates(productId));
    }
  }, [dispatch, productId]);

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <AppSearchBar placeholder="Tìm kiếm chứng chỉ" onChange={(e) => setSearchText(e.target.value)} />
        <Button
          variant="contained"
          startIcon={<PlusOutlined />}
          onClick={() => navigate(`${TOURISM_FACILITY_URLs.PRODUCT.CREATE_CERTIFICATE}?productId=${productId}`)}
        >
          Thêm chứng chỉ
        </Button>
      </Stack>

      <Card>
        {currentCertificates?.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên chứng chỉ</TableCell>
                  <TableCell>Tổ chức cấp</TableCell>
                  <TableCell>Ngày cấp</TableCell>
                  <TableCell>Ngày hết hạn</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="right">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentCertificates?.map((cert) => (
                  <TableRow key={cert.certificationId}>
                    <TableCell>{cert.certificationName}</TableCell>
                    <TableCell>{cert.issuingOrganization}</TableCell>
                    <TableCell>{dayjs(cert.issueDate).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{cert.expiryDate ? dayjs(cert.expiryDate).format('DD/MM/YYYY') : 'Không có'}</TableCell>
                    <TableCell>
                      <Chip
                        label={cert.statusApproval ? 'Đã duyệt' : 'Chờ duyệt'}
                        color={cert.statusApproval ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton
                          size="small"
                          onClick={() =>
                            navigate(`${TOURISM_FACILITY_URLs.PRODUCT.VIEW_CERTIFICATE}?id=${cert.certificationId}&productId=${productId}`)
                          }
                        >
                          <EyeOutlined />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() =>
                            navigate(
                              `${TOURISM_FACILITY_URLs.PRODUCT.UPDATE_CERTIFICATE}?id=${cert.certificationId}&productId=${productId}`
                            )
                          }
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
              count={filteredCertificates.length}
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

export default CertificateList;
