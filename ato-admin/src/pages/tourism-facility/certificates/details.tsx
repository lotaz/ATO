import { ArrowLeftOutlined } from '@ant-design/icons';
import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { get } from '../../../helpers/axios-helper';
import { FacilityCertification, StatusApproval } from '../../../types/tourism-facility/certificate.types';

const CertificateDetails = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const [certificate, setCertificate] = useState<FacilityCertification | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await get(`/facility-certifications/${id}`);
        setCertificate(response.data);
      } catch (error) {
        console.error('Failed to fetch certificate:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCertificate();
    }
  }, [id]);
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
  if (!certificate) return <Typography>Không tìm thấy chứng chỉ</Typography>;

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          startIcon={<ArrowLeftOutlined />}
          onClick={() => navigate(TOURISM_FACILITY_URLs.CERTIFICATES.INDEX)}
          variant="outlined"
          sx={{ width: 'fit-content' }}
        >
          Quay lại danh sách
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate(`${TOURISM_FACILITY_URLs.CERTIFICATES.EDIT}?id=${id}`)}
          sx={{ width: 'fit-content' }}
        >
          Chỉnh sửa
        </Button>
      </Stack>

      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Thông tin chứng chỉ
              </Typography>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Hình ảnh chứng chỉ
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    {certificate.imgs?.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Certificate ${index + 1}`}
                        style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 4 }}
                      />
                    ))}
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Tên chứng chỉ
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {certificate.certificationName}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Ngày cấp
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {new Date(certificate.issueDate).toLocaleDateString()}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Ngày hết hạn
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {new Date(certificate.expiryDate).toLocaleDateString()}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Trạng thái
                  </Typography>
                  <Chip
                    label={getStatusLabel(certificate.statusApproval)}
                    color={getStatusColor(certificate.statusApproval)}
                    sx={{ fontWeight: 'bold' }}
                  />
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Chi tiết bổ sung
              </Typography>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Chi tiết
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {certificate.certificationDetails || 'Không có'}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Phản hồi
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {certificate.replyRequest || 'Không có'}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default CertificateDetails;
