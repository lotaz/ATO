import {
  Button,
  Card,
  Chip,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { get } from '../../../helpers/axios-helper';
import { FacilityCertification, StatusApproval } from '../../../types/tourism-facility/certificate.types';

const CertificateList = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<FacilityCertification[]>([]);
  const [filteredCertificates, setFilteredCertificates] = useState<FacilityCertification[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusApproval | 'all'>('all');

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await get('/facility-certifications/facility');
        setCertificates(response.data);
        setFilteredCertificates(response.data);
      } catch (error) {
        console.error('Failed to fetch certificates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredCertificates(certificates);
    } else {
      setFilteredCertificates(certificates.filter((cert) => cert.statusApproval === statusFilter));
    }
  }, [statusFilter, certificates]);

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
  if (loading) return <Typography>Đang tải...</Typography>;

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body1">Lọc theo trạng thái:</Typography>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusApproval | 'all')} size="small">
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value={StatusApproval.Approved}>Đã phê duyệt</MenuItem>
            <MenuItem value={StatusApproval.Processing}>Đang xử lý</MenuItem>
            <MenuItem value={StatusApproval.Reject}>Từ chối</MenuItem>
            <MenuItem value={StatusApproval.Update}>Cập nhật</MenuItem>
          </Select>
        </Stack>
        <Button variant="contained" onClick={() => navigate(TOURISM_FACILITY_URLs.CERTIFICATES.CREATE)}>
          Thêm chứng chỉ mới
        </Button>
      </Stack>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên chứng chỉ</TableCell>
                <TableCell>Ngày cấp</TableCell>
                <TableCell>Ngày hết hạn</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCertificates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body1" color="textSecondary">
                      Không có chứng nhận nào
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCertificates.map((cert) => (
                  <TableRow key={cert.certificationId}>
                    <TableCell>{cert.certificationName}</TableCell>
                    <TableCell>{new Date(cert.issueDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(cert.expiryDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Chip label={getStatusLabel(cert.statusApproval)} color={getStatusColor(cert.statusApproval)} />
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => navigate(`${TOURISM_FACILITY_URLs.CERTIFICATES.DETAILS}?id=${cert.certificationId}`)}>
                        Xem
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Stack>
  );
};

export default CertificateList;
