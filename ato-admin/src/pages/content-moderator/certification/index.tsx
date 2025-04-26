import { CalendarOutlined, EyeOutlined, FileTextOutlined, SafetyCertificateOutlined, ShopOutlined } from '@ant-design/icons';
import { Box, Card, CardContent, Chip, Grid, IconButton, MenuItem, Pagination, Select, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppSearchBar from '../../../components/table/SearchBar';
import { CONTENT_MODERATOR_URLs } from '../../../constants/content-moderator-urls';
import { certificationService } from '../../../services/content-moderator/certification.service';
import { CertificationResponseCM, StatusApproval } from '../../../types/content-moderator/certification.types';

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

  const [statusFilter, setStatusFilter] = useState<StatusApproval | 'all'>(StatusApproval.Processing);

  const filteredCertifications = certifications.filter(
    (cert) =>
      (cert.certificationName.toLowerCase().includes(searchText.toLowerCase()) ||
        cert.issuingOrganization.toLowerCase().includes(searchText.toLowerCase())) &&
      (statusFilter === 'all' || cert.statusApproval === statusFilter)
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
    <Stack spacing={3}>
      <Stack direction="row" gap={4} alignItems="center" mb={2}>
        <AppSearchBar
          placeholder="Tìm kiếm chứng chỉ"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ flex: 1 }}
        />
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusApproval | 'all')} sx={{ minWidth: 180 }}>
          <MenuItem value="all">Tất cả trạng thái</MenuItem>
          <MenuItem value={StatusApproval.Approved}>Đã duyệt</MenuItem>
          <MenuItem value={StatusApproval.Processing}>Đang xử lý</MenuItem>
          <MenuItem value={StatusApproval.Reject}>Từ chối</MenuItem>
          <MenuItem value={StatusApproval.Update}>Cần cập nhật</MenuItem>
        </Select>
      </Stack>

      {filteredCertifications.length > 0 ? (
        <>
          <Grid container spacing={0}>
            {filteredCertifications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cert) => (
              <Grid item xs={12} sm={6} md={4} key={cert.certificationId} sx={{ paddingRight: 2, paddingBottom: 2 }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Typography variant="h6" noWrap sx={{ maxWidth: '70%' }}>
                          {cert.certificationName}
                        </Typography>
                        <IconButton size="small" color="primary" onClick={() => handleOnClick(cert.certificationId)}>
                          <EyeOutlined />
                        </IconButton>
                      </Stack>

                      <Stack direction="row" alignItems="center" spacing={1}>
                        <SafetyCertificateOutlined />
                        <Typography variant="body2" color="text.secondary">
                          {cert.issuingOrganization}
                        </Typography>
                      </Stack>

                      {cert.product && (
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <FileTextOutlined />
                          <Typography variant="body2" color="text.secondary">
                            Sản phẩm: {cert.product.productName}
                          </Typography>
                        </Stack>
                      )}

                      {cert.touristFacility && (
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <ShopOutlined />
                          <Typography variant="body2" color="text.secondary">
                            Cơ sở: {cert.touristFacility.touristFacilityName}
                          </Typography>
                        </Stack>
                      )}

                      <Stack spacing={1}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <CalendarOutlined />
                          <Typography variant="body2">Ngày cấp: {new Date(cert.issueDate).toLocaleDateString('vi-VN')}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <CalendarOutlined />
                          <Typography variant="body2">Ngày hết hạn: {new Date(cert.expiryDate).toLocaleDateString('vi-VN')}</Typography>
                        </Stack>
                      </Stack>

                      <Box>
                        <Chip label={getStatusLabel(cert.statusApproval)} color={getStatusColor(cert.statusApproval)} size="small" />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(filteredCertifications.length / rowsPerPage)}
              page={page + 1}
              onChange={(_, newPage) => setPage(newPage - 1)}
              color="primary"
            />
          </Box>
        </>
      ) : (
        <Box mt={4}>
          <Typography>Không tìm thấy chứng chỉ cần duyệt</Typography>
        </Box>
      )}
    </Stack>
  );
};

export default CertificationList;
