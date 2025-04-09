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
import { useEffect, useState } from 'react';
import AppSearchBar from '../../../components/table/SearchBar';
import { certificationService } from '../../../services/content-moderator/certification.service';
import { CertificationResponseCM, StatusApproval } from '../../../types/content-moderator/certification.types';
import { useNavigate } from 'react-router-dom';
import { CONTENT_MODERATOR_URLs } from '../../../constants/content-moderator-urls';

const CertificationList = () => {
  const [certifications, setCertifications] = useState<CertificationResponseCM[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setLoading(true);
        const data = await certificationService.getCertifications();
        setCertifications(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch certifications');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredCertifications = certifications.filter(
    (cert) =>
      cert.certificationName.toLowerCase().includes(searchText.toLowerCase()) ||
      cert.issuingOrganization.toLowerCase().includes(searchText.toLowerCase())
  );

  const getStatusColor = (status: StatusApproval) => {
    switch (status) {
      case StatusApproval.Approved:
        return 'success';
      case StatusApproval.Processing:
        return 'warning';
      case StatusApproval.Reject:
        return 'error';
      case StatusApproval.Update:
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: StatusApproval) => {
    switch (status) {
      case StatusApproval.Approved:
        return 'Đã duyệt';
      case StatusApproval.Processing:
        return 'Đang xử lý';
      case StatusApproval.Reject:
        return 'Từ chối';
      case StatusApproval.Update:
        return 'Cần cập nhật';
      default:
        return 'Không xác định';
    }
  };

  const handleOnClick = (certId: any) => {
    navigate(`${CONTENT_MODERATOR_URLs.CER.DETAILS}?id=${certId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Stack spacing={2}>
      <Box>
        <AppSearchBar placeholder="Tìm kiếm chứng chỉ" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên chứng chỉ</TableCell>
                <TableCell>Tổ chức cấp</TableCell>
                <TableCell>Sản phẩm</TableCell>
                <TableCell>Cơ sở du lịch</TableCell>
                <TableCell>Ngày cấp</TableCell>
                <TableCell>Ngày hết hạn</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCertifications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cert, index) => (
                <TableRow hover key={cert.certificationId}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{cert.certificationName}</TableCell>
                  <TableCell>{cert.issuingOrganization}</TableCell>
                  <TableCell>{cert.product?.productName || '-'}</TableCell>
                  <TableCell>{cert.touristFacility?.touristFacilityName || '-'}</TableCell>
                  <TableCell>{new Date(cert.issueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(cert.expiryDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip label={getStatusLabel(cert.statusApproval)} color={getStatusColor(cert.statusApproval)} size="small" />
                  </TableCell>
                  <TableCell>
                    <Button sx={{ width: '120px' }} onClick={() => handleOnClick(cert.certificationId)} variant="contained" size="small">
                      Xem chi tiết
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
          count={filteredCertifications.length}
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

export default CertificationList;
