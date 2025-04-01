import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { TOURISM_FACILITY_URLs } from '../../../../constants/tourism-facility-urls';
import { RootState } from '../../../../redux/store';
import { fetchCertificate } from '../../../../redux/tourism-facility/certificate.slice';
import { ImageCarousel } from '../../../../components/carousel/ImageCarousel';
import dayjs from 'dayjs';

const ViewCertificate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const productId = params.get('productId');

  const { specific: certificate, loading } = useSelector((state: RootState) => state.certificateSlice);

  useEffect(() => {
    if (id) {
      dispatch(fetchCertificate(id));
    }
  }, [dispatch, id]);

  if (loading || !certificate) {
    return <div>Loading...</div>;
  }

  const DetailItem = ({ label, value }: { label: string; value: any }) => (
    <Box sx={{ py: 1 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value || '-'}</Typography>
    </Box>
  );

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button
          startIcon={<ArrowLeftOutlined />}
          onClick={() => navigate(`${TOURISM_FACILITY_URLs.PRODUCT.DETAILS}?productId=${productId}`)}
        >
          Quay lại
        </Button>
        <Typography variant="h5">Chi tiết chứng chỉ</Typography>
      </Stack>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            {/* Certificate Images */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Hình ảnh chứng chỉ
              </Typography>
              <ImageCarousel images={certificate.imgs || []} />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* Basic Information */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Thông tin cơ bản
              </Typography>
              <DetailItem label="Tên chứng chỉ" value={certificate.certificationName} />
              <DetailItem label="Tổ chức cấp" value={certificate.issuingOrganization} />
              <DetailItem
                label="Trạng thái"
                value={
                  <Chip
                    label={certificate.statusApproval ? 'Đã duyệt' : 'Chờ duyệt'}
                    color={certificate.statusApproval ? 'success' : 'warning'}
                    size="small"
                  />
                }
              />
            </Grid>

            {/* Dates */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Thông tin thời gian
              </Typography>
              <DetailItem label="Ngày cấp" value={dayjs(certificate.issueDate).format('DD/MM/YYYY')} />
              <DetailItem
                label="Ngày hết hạn"
                value={certificate.expiryDate ? dayjs(certificate.expiryDate).format('DD/MM/YYYY') : 'Không có'}
              />
              <DetailItem
                label="Ngày cập nhật"
                value={certificate.updatedDate ? dayjs(certificate.updatedDate).format('DD/MM/YYYY HH:mm') : '-'}
              />
            </Grid>

            {/* Details */}
            <Grid item xs={12}>
              <Divider />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Chi tiết chứng chỉ
                </Typography>
                <DetailItem label="Chi tiết" value={certificate.certificationDetails} />
                {certificate.replyRequest && <DetailItem label="Phản hồi yêu cầu" value={certificate.replyRequest} />}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ViewCertificate;
